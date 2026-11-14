export function RegularColumn({ value }: { value: string }) {
  return <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
    <div className="text-gray-900">{value}</div>
  </td>
}