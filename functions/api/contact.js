export async function onRequest(context) {

    if (context.request.method !== "POST") {
        return new Response("Method Not Allowed", {
            status: 405
        });
    }

    const formData = await context.request.formData();

    const token = formData.get("cf-turnstile-response");

    if (!token) {
        return Response.json(
            {
                success: false,
                error: "Missing Turnstile token."
            },
            {
                status: 400
            }
        );
    }

    const ip =
        context.request.headers.get("CF-Connecting-IP");

    const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                secret: context.env.TURNSTILE_SECRET,
                response: token,
                remoteip: ip ?? ""
            })
        }
    );

    const result = await verify.json();

    if (!result.success) {

        return Response.json(
            {
                success: false,
                turnstile: result
            },
            {
                status: 403
            }
        );
    }

    return Response.json({
        success: true,
        message: "Turnstile validated successfully."
    });

}