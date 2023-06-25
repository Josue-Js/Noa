



export function convertMinutesToHours(time: number) {

  const hours = (time / 60).toFixed(0)
  const minutes = (time % 60).toFixed(0).padStart(2, '0')

  return `${hours}h ${minutes}min`
}