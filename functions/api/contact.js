import { Resend } from "resend";

export async function onRequest(context) {

    if (context.request.method !== "POST") {
        return new Response("Method Not Allowed", {
            status: 405
        });
    }

    const form = await context.request.formData();

    const name = form.get("name");
    const company = form.get("company");
    const email = form.get("email");
    const project = form.get("project");
    const message = form.get("message");

    const token = form.get("cf-turnstile-response");

    if (!token) {
        return Response.json(
            { success: false, error: "Missing Turnstile token." },
            { status: 400 }
        );
    }

    const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                secret: context.env.TURNSTILE_SECRET,
                response: token,
                remoteip:
                    context.request.headers.get("CF-Connecting-IP") ?? ""
            })
        }
    );

    const turnstile = await verify.json();

    if (!turnstile.success) {
        return Response.json(
            {
                success: false,
                error: "Turnstile validation failed."
            },
            {
                status: 403
            }
        );
    }

    const resend = new Resend(context.env.RESEND_API_KEY);
    try{
    await resend.emails.send({
        from: context.env.FROM_EMAIL,
        to: context.env.TO_EMAIL,
        replyTo: email,
        subject: `BAR3 Website - ${project}`,
        html: `
        <h2>New Website Inquiry</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Company:</strong> ${company}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Project:</strong> ${project}</p>

        <hr>

        <p>${message.replace(/\n/g,"<br>")}</p>
        `
    });
    }
    catch(err){

    return Response.json({
        success:false,
        error:err.message
    },{status:500});

    }
    return Response.json({
        success: true
    });

}