import { FETCH_URL } from '@/lib/constants'

export async function GET(request: Request) {
  const [content, year, month, day, hour] = request.url.split('/').slice(5)

  const time = {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
  }

  const decodedContent = decodeURIComponent(content)
  const response = await fetch(
    `${FETCH_URL}?content=${decodedContent}&time=${JSON.stringify(time)}`,
  )

  return new Response(JSON.stringify(await response.json()))
}
