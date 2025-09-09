// app/api/upload-csv/route.js
export async function POST(request) {
  const apiUrl = `${process.env.BACKEND_URL}/upload-csv`;
  const authHeader = request.headers.get('Authorization');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    const backendFormData = new FormData();
    backendFormData.append('file', file);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
      body: backendFormData
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