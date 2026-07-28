export async function onRequest(context) {

    if (context.request.method !== "POST") {
        return new Response("Method Not Allowed", {
            status: 405
        });
    }

    const formData = await context.request.formData();

    const data = {
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        project: formData.get("project"),
        message: formData.get("message"),
        turnstile: formData.get("cf-turnstile-response")
    };

    return Response.json(data);
}