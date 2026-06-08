export function getCategoryBadgeClasses(category: string) {
  switch (category) {
    case "Technology":
      return "bg-blue-950/60 text-blue-400";
    case "Design":
      return "bg-purple-950/60 text-purple-400";
    case "Lifestyle":
      return "bg-green-950/60 text-green-400";
    case "Travel":
      return "bg-orange-950/60 text-orange-400";
    case "Food":
      return "bg-red-950/60 text-red-400";
    default:
      return "bg-[#3D3310] text-[#E8C547]";
  }
}
