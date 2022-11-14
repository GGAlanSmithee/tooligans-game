import { sortBy } from "lodash"
import { fromUnit, Lucid } from "lucid-cardano"
import { useCallback, useEffect, useState } from "react"

import { Responses } from "@blockfrost/blockfrost-js"

type Value = ReturnType<typeof fromUnit>

interface ValueWithName extends Omit<Value, "name"> {
  value: number
  name: string
}

const tooligansPolicyId = "aa4411ee213166c23050ec6b3e782500fd3f9210121d607378622548"

const useTooligansAssets = (lucid?: Lucid, networkId?: number): Responses["asset"][] => {
  const [tooligansAssets, setTooligansAssets] = useState<Responses["asset"][]>([])

  const fetchTooligans = useCallback(async () => {
    if (!lucid?.wallet) return

    const utxos = await lucid.wallet.getUtxos()

    const allUtxos = utxos
      .map((u) => Object.keys(u.assets).map((key) => ({ key, value: u.assets[key] })))
      .reduce((acc, curr) => [...acc, ...curr], [])
      .map((a) => ({
        ...fromUnit(a.key),
        value: Number(a.value),
      }))

    const utxoAssets = allUtxos
      .filter((u) => u.policyId === tooligansPolicyId)
      .filter((v: Value): v is ValueWithName => v.name !== null)
      .map((a) => ({
        ...a,
        fullyQualifiedAssetName: `${a.policyId}${a.name}`,
      }))

    const assetsWithMetadata: Responses["asset"][] = await Promise.all(
      utxoAssets.map((a) =>
        fetch(`/api/blockfrost/${networkId}/assets/${a.fullyQualifiedAssetName}`).then((r) =>
          r.json()
        )
      )
    )

    const sortedAssets = sortBy(
      assetsWithMetadata,
      (a) => (Number(a.quantity) === 1 ? 1 : -1),
      "policy_id",
      "metadata.name",
      "onchain_metadata.name"
    )

    setTooligansAssets(sortedAssets)
  }, [lucid?.wallet, networkId])

  useEffect(() => {
    fetchTooligans()
  }, [fetchTooligans])

  return tooligansAssets
}

export { useTooligansAssets }
