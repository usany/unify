export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    const method = request.method;

    // Handle different HTTP methods
    switch (method) {
      case 'GET':
        return handleGet(url, env);
      case 'POST':
        return handlePost(request, env);
      case 'PUT':
        return handlePut(request, env);
      case 'DELETE':
        return handleDelete(url, env);
      default:
        return new Response('Method not allowed', { status: 405 });
    }
  }
};

async function handleGet(url: URL, env: any) {
  const pageId = url.searchParams.get('pageId');
  
  if (!pageId) {
    return new Response(JSON.stringify({ error: 'pageId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const result = await env.instructions_db.prepare('SELECT * FROM comments WHERE slug = ? ORDER BY created_at DESC')
      .bind(pageId)
      .all();
    
    const comments = organizeComments(result.results);
    
    return new Response(JSON.stringify({ comments }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handlePost(request: Request, env: any) {
  try {
    const body = await request.json() as { pageId?: string; author?: string; content?: string; parentId?: string };
    const { pageId, author, content, parentId } = body;

    if (!pageId || !author || !content) {
      return new Response(JSON.stringify({ error: 'pageId, author, and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = Date.now().toString();
    
    await env.instructions_db.prepare('INSERT INTO comments (slug, author, content, parent_id) VALUES (?, ?, ?, ?)')
      .bind(pageId, author, content, parentId || null)
      .run();

    const comment = await env.instructions_db.prepare('SELECT * FROM comments WHERE id = ?')
      .bind(id)
      .first();

    return new Response(JSON.stringify({ comment }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create comment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handlePut(request: Request, env: any) {
  try {
    const body = await request.json() as { id?: string; content?: string };
    const { id, content } = body;

    if (!id || !content) {
      return new Response(JSON.stringify({ error: 'id and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.instructions_db.prepare('UPDATE comments SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(content, id)
      .run();

    const comment = await env.instructions_db.prepare('SELECT * FROM comments WHERE id = ?')
      .bind(id)
      .first();

    return new Response(JSON.stringify({ comment }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update comment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleDelete(url: URL, env: any) {
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await env.instructions_db.prepare('DELETE FROM comments WHERE id = ?')
      .bind(id)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete comment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function organizeComments(flatComments: any[]) {
  const commentMap = new Map();
  const rootComments: any[] = [];

  // Create a map of all comments
  flatComments.forEach((comment: any) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Build the tree structure
  flatComments.forEach((comment: any) => {
    const commentNode = commentMap.get(comment.id);
    
    if (comment.parent_id) {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.replies.push(commentNode);
      }
    } else {
      rootComments.push(commentNode);
    }
  });

  return rootComments;
}
