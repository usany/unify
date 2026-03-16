import type { ActionFunctionArgs } from "react-router";

export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const busRouteId = url.searchParams.get("busRouteId");
  
  if (!busRouteId) {
    return Response.json({ error: "busRouteId is required" }, { status: 400 });
  }

  const key = "2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97";
  const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=${key}&busRouteId=${busRouteId}`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    
    // Return the response as plain text since it's XML
    return new Response(responseText, {
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching bus data:', error);
    return Response.json(
      { error: 'Failed to fetch bus data' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
