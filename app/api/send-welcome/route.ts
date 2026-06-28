import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmail(name: string, company: string, projectType: string): string {
  const firstName = name.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Let's build something great</title>
</head>
<body style="margin:0;padding:0;background:#F5F1E8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1E8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo bar -->
          <tr>
            <td style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#F4611A;border-radius:12px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-weight:900;font-size:16px;line-height:36px;">T</span>
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <span style="font-weight:900;font-size:18px;color:#1A0F3C;letter-spacing:-0.03em;">Tivra</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#FFFFFF;border-radius:24px;padding:40px 40px 32px;border:1px solid #EDE9E3;">

              <!-- Greeting -->
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#F4611A;text-transform:uppercase;letter-spacing:0.1em;">New Connection</p>
              <h1 style="margin:0 0 20px;font-size:28px;font-weight:900;color:#1A0F3C;line-height:1.15;">
                Hey ${firstName}, let's build something remarkable.
              </h1>

              <!-- Body -->
              <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;">
                We noticed ${company ? `<strong>${company}</strong>` : "your business"} and we'd love to explore building your ${projectType.toLowerCase()} together. At Tivra, we turn ideas into fast, beautiful websites — in just <strong>7 days</strong>.
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#444;line-height:1.7;">
                No bloated briefs, no endless back-and-forth. Just a clear process, great design, and a live website your customers will love.
              </p>

              <!-- Value props -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;width:100%;">
                <tr>
                  <td style="padding:12px 16px;background:#FEF0E9;border-radius:12px;margin-bottom:8px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:20px;padding-right:12px;">⚡</td>
                        <td>
                          <p style="margin:0;font-size:14px;font-weight:700;color:#1A0F3C;">Live in 7 days</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#787878;">From first call to published website.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#FEF0E9;border-radius:12px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:20px;padding-right:12px;">🎯</td>
                        <td>
                          <p style="margin:0;font-size:14px;font-weight:700;color:#1A0F3C;">Built around you</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#787878;">Strategy, design, and dev — all handled end-to-end.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#FEF0E9;border-radius:12px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:20px;padding-right:12px;">📈</td>
                        <td>
                          <p style="margin:0;font-size:14px;font-weight:700;color:#1A0F3C;">3× more leads</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#787878;">Average increase clients see within 30 days.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#F4611A;border-radius:14px;">
                    <a href="https://tivra.in/book-demo" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;">
                      Book a Free 15-min Call →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #EDE9E3;margin:0 0 24px;" />

              <!-- Signature -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#F4611A;border-radius:10px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-weight:900;font-size:14px;">DR</span>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#1A0F3C;">Dhiraj Rana</p>
                    <p style="margin:2px 0 0;font-size:12px;color:#787878;">Founder, Tivra</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 4px 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#ABABAB;line-height:1.6;">
                You're receiving this because we think we'd be a great fit.<br />
                <a href="mailto:dhiraj503@gmail.com" style="color:#ABABAB;">Get in touch</a> if you'd like to know more.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const { name, email, company, project_type } = await req.json();

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: `Hey ${name.split(" ")[0]}, let's build something great 🚀`,
      html: buildEmail(name, company, project_type),
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
