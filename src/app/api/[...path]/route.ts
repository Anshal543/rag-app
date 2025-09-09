// export async function GET(request, { params }) {
//   return handleApiRequest(request, params);
// }

// export async function POST(request, { params }) {
//   return handleApiRequest(request, params);
// }

// export async function PUT(request, { params }) {
//   return handleApiRequest(request, params);
// }

// export async function DELETE(request, { params }) {
//   return handleApiRequest(request, params);
// }

// async function handleApiRequest(request, { path }) {
//   const apiUrl = `${process.env.BACKEND_URL}/${path.join('/')}`;
//   // const authHeader = request.headers.get('Authorization');
  
//   try {
//     const response = await fetch(apiUrl, {
//       method: request.method,
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': authHeader
//       },
//       body: request.method !== 'GET' ? await request.text() : undefined
//     });

//     const data = await response.json();
//     return new Response(JSON.stringify(data), {
//       status: response.status,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Internal server error' }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   }
// }



// app/api/[...path]/route.ts
// import { NextRequest, NextResponse } from "next/server";

// type Params = {
//   params: {
//     path: string[];
//   };
// };

// export async function GET(request: NextRequest, { params }: Params) {
//   return handleApiRequest(request, params);
// }

// export async function POST(request: NextRequest, { params }: Params) {
//   return handleApiRequest(request, params);
// }

// export async function PUT(request: NextRequest, { params }: Params) {
//   return handleApiRequest(request, params);
// }

// export async function DELETE(request: NextRequest, { params }: Params) {
//   return handleApiRequest(request, params);
// }

// async function handleApiRequest(request: NextRequest, params: { path: string[] }) {
//   const apiUrl = `${process.env.BACKEND_URL}/${params.path.join("/")}`;
//   // const authHeader = request.headers.get("Authorization");

//   try {
//     const response = await fetch(apiUrl, {
//       method: request.method,
//       headers: {
//         "Content-Type": "application/json",
//         // "Authorization": authHeader,
//       },
//       body: request.method !== "GET" ? await request.text() : undefined,
//     });

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


// app/api/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleApiRequest(request, await context.params);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleApiRequest(request, await context.params);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleApiRequest(request, await context.params);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleApiRequest(request, await context.params);
}

async function handleApiRequest(request: NextRequest, params: { path: string[] }) {
  const apiUrl = `${process.env.BACKEND_URL}/${params.path.join("/")}`;
  // const authHeader = request.headers.get("Authorization");

  try {
    const response = await fetch(apiUrl, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        // "Authorization": authHeader,
      },
      body: request.method !== "GET" ? await request.text() : undefined,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
