// app/api/[...path]/route.js
export async function GET(request, { params }) {
  return handleApiRequest(request, params);
}

export async function POST(request, { params }) {
  return handleApiRequest(request, params);
}

export async function PUT(request, { params }) {
  return handleApiRequest(request, params);
}

export async function DELETE(request, { params }) {
  return handleApiRequest(request, params);
}

async function handleApiRequest(request, { path }) {
  const apiUrl = `${process.env.BACKEND_URL}/${path.join('/')}`;
  // const authHeader = request.headers.get('Authorization');
  
  try {
    const response = await fetch(apiUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': authHeader
      },
      body: request.method !== 'GET' ? await request.text() : undefined
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}