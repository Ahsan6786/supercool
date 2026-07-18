// Premium, Luxury, Enterprise-Grade Email Template System for SuperCool AC Services
// Fully responsive, Outlook-safe, optimized for Gmail, Apple Mail, and all major clients.
// Dual language support: English (LTR) and Arabic (RTL) native layouts.

const RESPONSIVE_CSS = `<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f3f4f6; }
  a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
  
  @media only screen and (max-width: 600px) {
    .outer-wrapper { padding: 12px 8px !important; }
    .inner-card { border-radius: 16px !important; }
    .hero-pad { padding: 32px 16px !important; }
    .body-pad { padding: 24px 16px !important; }
    .footer-pad { padding: 24px 16px !important; }
    .mobile-col { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 12px 0 !important; }
    .mobile-col-3 { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 8px 0 !important; text-align: center !important; }
    .mobile-btn { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
    .mobile-hide { display: none !important; }
    .mobile-text-center { text-align: center !important; }
    .mobile-border-none { border: none !important; }
  }
</style>`;

// ─── SHARED TRUST SECTION BUILDER ──────────────────────────────────────────
const getTrustSectionEn = () => `
  <div style="background-color: #fafbfc; border-top: 1px solid #eef1f6; padding: 28px 24px;">
    <div style="text-align: center; margin-bottom: 18px;">
      <span style="font-size: 11px; font-weight: 800; color: #64748b; letter-spacing: 2px; text-transform: uppercase;">The SuperCool Promise</span>
    </div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 10px 16px 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-left: 8px;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">Certified Technicians</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">Rigorous training and verified background checks.</p>
              </td>
            </tr>
          </table>
        </td>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 0 16px 10px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-left: 8px;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">30+ Years Experience</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">Proudly cooling the Al Ahsa & Hofuf communities since 1996.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 10px 0 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-left: 8px;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">Genuine Spare Parts</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">Only high-grade, original factory replacements used.</p>
              </td>
            </tr>
          </table>
        </td>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 0 0 10px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-left: 8px;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">Fast Response Time</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">Rapid response team deployed dynamically.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

const getTrustSectionAr = () => `
  <div style="background-color: #fafbfc; border-top: 1px solid #eef1f6; padding: 28px 24px; text-align: right;" dir="rtl">
    <div style="text-align: center; margin-bottom: 18px;">
      <span style="font-size: 11px; font-weight: 800; color: #64748b; letter-spacing: 2px; text-transform: uppercase;">وعد سوبر كول</span>
    </div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
      <tr>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 0 16px 10px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-right: 8px; text-align: right;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">فنيون معتمدون</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">تدريب مكثف وفحوصات مهنية دقيقة.</p>
              </td>
            </tr>
          </table>
        </td>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 10px 16px 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-right: 8px; text-align: right;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">خبرة ٣٠+ عاماً</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">نخدم مجتمع الأحساء والهفوف منذ عام ١٩٩٦م.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 0 0 10px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-right: 8px; text-align: right;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">قطع غيار أصلية</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">نستخدم فقط قطع الغيار الأصلية المعتمدة.</p>
              </td>
            </tr>
          </table>
        </td>
        <td class="mobile-col" width="50%" valign="top" style="padding: 0 10px 0 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
            <tr>
              <td width="28" valign="top" style="padding-top: 2px;">
                <div style="width: 18px; height: 18px; background-color: #e8f4fd; border-radius: 4px; text-align: center; line-height: 18px; color: #1a4a8a; font-size: 11px; font-weight: bold;">✓</div>
              </td>
              <td valign="top" style="padding-right: 8px; text-align: right;">
                <h5 style="margin: 0 0 2px 0; color: #0c2b5c; font-size: 13px; font-weight: 700;">سرعة الاستجابة</h5>
                <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.4;">فريق استجابة سريع متواجد لتلبية طلباتكم.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

// ─── SHARED FOOTER BUILDER ──────────────────────────────────────────────────
const getFooterEn = () => `
  <div class="footer-pad" style="background-color: #051429; padding: 36px 32px; text-align: center;">
    <div style="margin-bottom: 20px;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool" style="height: 50px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
    </div>
    <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">SuperCool Air Conditioning Services</p>
    <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">Residential & Commercial Cooling Specialists<br/>Al Ahsa, Hofuf, Eastern Province, Saudi Arabia</p>
    
    <div style="margin-bottom: 24px;">
      <a href="tel:+966566706358" target="_blank" style="display: inline-block; background-color: rgba(255,255,255,0.06); color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 4px;">Call: 056 670 6358</a>
      <a href="https://wa.me/966566706358" target="_blank" style="display: inline-block; background-color: rgba(37,211,102,0.1); color: #25d366; font-size: 12px; font-weight: 700; text-decoration: none; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(37,211,102,0.2); margin: 4px;">WhatsApp Support</a>
    </div>

    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
      <tr>
        <td class="mobile-col" align="left" style="font-size: 11px; color: #64748b;">
          &copy; ${new Date().getFullYear()} SuperCool. All rights reserved.
        </td>
        <td class="mobile-col" align="right" style="font-size: 11px; color: #64748b;">
          <a href="https://supercoolalhasa.shop" target="_blank" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">Website</a>
          <a href="https://supercoolalhasa.shop/privacy" target="_blank" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
        </td>
      </tr>
    </table>
  </div>
`;

const getFooterAr = () => `
  <div class="footer-pad" style="background-color: #051429; padding: 36px 32px; text-align: center;" dir="rtl">
    <div style="margin-bottom: 20px;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 50px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
    </div>
    <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">سوبر كول لخدمات التكييف والتبريد</p>
    <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">متخصصو أنظمة التبريد السكنية والتجارية<br/>الأحساء، الهفوف، المنطقة الشرقية، المملكة العربية السعودية</p>
    
    <div style="margin-bottom: 24px;">
      <a href="tel:+966566706358" target="_blank" style="display: inline-block; background-color: rgba(255,255,255,0.06); color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 4px;">اتصال: ٠٥٦ ٦٧٠ ٦٣٥٨</a>
      <a href="https://wa.me/966566706358" target="_blank" style="display: inline-block; background-color: rgba(37,211,102,0.1); color: #25d366; font-size: 12px; font-weight: 700; text-decoration: none; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(37,211,102,0.2); margin: 4px;">الدعم الفني واتساب</a>
    </div>

    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;" dir="rtl">
      <tr>
        <td class="mobile-col" align="right" style="font-size: 11px; color: #64748b; text-align: right;">
          &copy; ${new Date().getFullYear()} سوبر كول. جميع الحقوق محفوظة.
        </td>
        <td class="mobile-col" align="left" style="font-size: 11px; color: #64748b; text-align: left;">
          <a href="https://supercoolalhasa.shop" target="_blank" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">موقعنا الإلكتروني</a>
          <a href="https://supercoolalhasa.shop/privacy" target="_blank" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">سياسة الخصوصية</a>
        </td>
      </tr>
    </table>
  </div>
`;

// ─── MAIN EXPORTED TEMPLATE DEFINITIONS ──────────────────────────────────────
export const TEMPLATES = [
  // ─── 1. ANNOUNCEMENT ───────────────────────────────────────────────────────
  {
    id: "announcement",
    icon: "fa-solid fa-bullhorn",
    titleEn: "Announcement",
    titleAr: "إعلان عام",
    descEn: "Clean official update layout.",
    descAr: "قالب إعلانات رسمي منسق.",
    subjectEn: "SuperCool AC Services — Professional Fleet & Service Updates",
    subjectAr: "تحديثات وتطوير خدمات سوبر كول للتكييف بالأحساء",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Header Announcement -->
    <div class="hero-pad" style="background: linear-gradient(150deg, #061730 0%, #0c2b5c 50%, #153e7a 100%); padding: 48px 36px; text-align: center; position: relative;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.3; letter-spacing: -0.5px;">Fleet Expansion & Service Updates</h1>
      <p style="color: #93c5fd; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 500;">Expanding professional diagnostic AC services in Al Ahsa</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px;">
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">We are pleased to announce that SuperCool AC Services has updated our equipment fleet and added certified technicians to serve you faster in Al Ahsa, Al Hofuf, and Al Mubarraz.</p>
      
      <!-- Key Features Block -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafbfc; border-radius: 16px; border: 1px solid #edf2f7; margin-bottom: 28px;">
        <tr>
          <td style="padding: 20px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="mobile-col" width="33%" align="center" style="padding: 10px; border-right: 1px solid #edf2f7;">
                  <span style="font-size: 18px; font-weight: 800; color: #0c2b5c; display: block;">100%</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Certified Techs</span>
                </td>
                <td class="mobile-col" width="33%" align="center" style="padding: 10px; border-right: 1px solid #edf2f7;">
                  <span style="font-size: 18px; font-weight: 800; color: #0c2b5c; display: block;">24/7</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Support Active</span>
                </td>
                <td class="mobile-col" width="33%" align="center" style="padding: 10px;">
                  <span style="font-size: 18px; font-weight: 800; color: #0c2b5c; display: block;">10k+</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Clients Serviced</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 28px 0;">Whether you need immediate split AC repair, copper piping installation, or emergency troubleshooting, our team is equipped with modern diagnostic tools to deliver premium results.</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">Chat with our Operations Desk</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Header Announcement -->
    <div class="hero-pad" style="background: linear-gradient(150deg, #061730 0%, #0c2b5c 50%, #153e7a 100%); padding: 48px 36px; text-align: center; position: relative;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.3;">تحديث الخدمات وتوسيع أسطول الصيانة</h1>
      <p style="color: #93c5fd; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 500;">تطوير وتوسيع باقة خدمات التكييف الاحترافية بالأحساء</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px; text-align: right;">
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 20px 0;">يسر سوبر كول لخدمات التكييف والتبريد أن تعلن عن تحديث كامل لأسطول سيارات الخدمة والمعدات التشخيصية، مع انضمام فنيين مؤهلين ومعتمدين لتقديم خدمة أسرع وأكثر كفاءة في كافة مناطق الأحساء، الهفوف، والمبرز.</p>
      
      <!-- Key Features Block -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafbfc; border-radius: 16px; border: 1px solid #edf2f7; margin-bottom: 28px;" dir="rtl">
        <tr>
          <td style="padding: 20px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
              <tr>
                <td class="mobile-col" width="33%" align="center" style="padding: 10px; border-left: 1px solid #edf2f7;">
                  <span style="font-size: 18px; font-weight: 800; color: #0c2b5c; display: block;">١٠٠٪</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 600;">فنيون معتمدون</span>
                </td>
                <td class="mobile-col" width="33%" align="center" style="padding: 10px; border-left: 1px solid #edf2f7;">
                  <span style="font-size: 18px; font-weight: 800; color: #0c2b5c; display: block;">٢٤/٧</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 600;">دعم مستمر</span>
                </td>
                <td class="mobile-col" width="33%" align="center" style="padding: 10px;">
                  <span style="font-size: 18px; font-weight: 800; color: #0c2b5c; display: block;">١٠ آلاف+</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 600;">عميل تم خدمتهم</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 28px 0;">سواء كنتم بحاجة إلى إصلاح فوري للمكيفات السبلت، أو تركيب أنابيب النحاس، أو استكشاف الأعطال وحلها، فإن فرقنا الفنية مجهزة بأحدث أدوات الفحص لضمان التبريد المثالي.</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">تواصل مع قسم العمليات الآن</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  },

  // ─── 2. SUMMER PROMOTION ──────────────────────────────────────────────────
  {
    id: "promotion",
    icon: "fa-solid fa-tags",
    titleEn: "Summer Promo",
    titleAr: "عرض الصيف",
    descEn: "Premium split discount promo layout.",
    descAr: "قالب عروض الصيف والخصومات الحصرية.",
    subjectEn: "Beat the Heat! SuperCool AC Cleaning Campaign — 15% OFF",
    subjectAr: "وفر ١٥٪ على خدمات غسيل وصيانة المكيفات مع سوبر كول",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Banner with Promo Theme -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #0c2b5c 0%, #1e4d8c 100%); padding: 52px 36px; text-align: center; color: #ffffff;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <div style="display: inline-block; background-color: #e23c2d; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; padding: 6px 14px; border-radius: 30px; margin-bottom: 16px;">Seasonal Promotion</div>
      <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">Premium Summer Comfort</h1>
      <p style="color: #bfdbfe; font-size: 15px; margin: 0; line-height: 1.6; max-width: 460px; margin: 0 auto;">Enjoy 15% off professional AC deep cleaning and maintenance packages</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px;">
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">Don't let a dusty, underperforming AC compromise your comfort. A clogged filter or low refrigerant gas can cause water leaks, higher electrical bills, and poor cooling.</p>
      
      <!-- Box Inclusions -->
      <div style="background-color: #f8fafc; border: 1px solid #edf2f7; border-radius: 16px; padding: 24px; margin-bottom: 28px;">
        <h3 style="margin: 0 0 16px 0; color: #0c2b5c; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Our Deep Cleaning Service Includes:</h3>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-right: 6px;">✓</span> High-pressure pump coil washing (indoor & outdoor units)
            </td>
          </tr>
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-right: 6px;">✓</span> Safe wall and furniture protection using professional drainage bags
            </td>
          </tr>
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-right: 6px;">✓</span> Advanced filter disinfection and anti-bacterial rinse
            </td>
          </tr>
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-right: 6px;">✓</span> Full electricity draw check and diagnostic gas pressure check
            </td>
          </tr>
        </table>
      </div>

      <!-- Pricing Comparison -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 32px; border: 1px solid #eef1f6; border-radius: 16px; overflow: hidden;">
        <tr>
          <td align="center" style="background-color: #f8fafc; padding: 18px 12px; border-bottom: 1px solid #eef1f6; font-size: 14px; color: #64748b; font-weight: 700;">REGULAR PRICE</td>
          <td align="center" style="background-color: #fff8f8; padding: 18px 12px; border-bottom: 1px solid #eef1f6; font-size: 14px; color: #e23c2d; font-weight: 700;">PROMO PRICE</td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 12px; font-size: 16px; color: #94a3b8; text-decoration: line-through; font-weight: bold;">150 SAR</td>
          <td align="center" style="padding: 20px 12px; font-size: 24px; color: #e23c2d; font-weight: 900; background-color: #fffbfb;">125 SAR <span style="font-size: 12px; font-weight: 500; color: #64748b;">/ unit</span></td>
        </tr>
      </table>

      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #25d366 0%, #1db954 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(37,211,102,0.25);">Book on WhatsApp</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Banner with Promo Theme -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #0c2b5c 0%, #1e4d8c 100%); padding: 52px 36px; text-align: center; color: #ffffff;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <div style="display: inline-block; background-color: #e23c2d; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; padding: 6px 14px; border-radius: 30px; margin-bottom: 16px;">عروض موسمية</div>
      <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0 0 12px 0; line-height: 1.2;">صيف بارد ومنعش مع سوبر كول</h1>
      <p style="color: #bfdbfe; font-size: 15px; margin: 0; line-height: 1.6; max-width: 460px; margin: 0 auto;">احصل على خصم ١٥٪ على جميع باقات غسيل وصيانة المكيفات السبلت</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px; text-align: right;">
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 24px 0;">تراكم الأتربة والغبار يقلل من جودة الهواء ويزيد من استهلاك الكهرباء وضعف التبريد. حل مشاكل التنقيط وضعف تدفق الهواء عبر تنظيف مكيفك بالضغط العالي.</p>
      
      <!-- Box Inclusions -->
      <div style="background-color: #f8fafc; border: 1px solid #edf2f7; border-radius: 16px; padding: 24px; margin-bottom: 28px;">
        <h3 style="margin: 0 0 16px 0; color: #0c2b5c; font-size: 15px; font-weight: 800; text-transform: uppercase;">باقة الغسيل العميق تشمل:</h3>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-left: 6px;">✓</span> غسيل كويلات الوحدات الداخلية والخارجية بمضخة الضغط العالي
            </td>
          </tr>
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-left: 6px;">✓</span> حماية الجدران والأثاث باستخدام أكياس تصريف مخصصة أثناء الغسيل
            </td>
          </tr>
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-left: 6px;">✓</span> تطهير الفلاتر بمواد معقمة ومضادة للبكتيريا والروائح الكريهة
            </td>
          </tr>
          <tr>
            <td valign="top" style="padding: 8px 0; font-size: 14px; color: #475569;">
              <span style="color: #1a4a8a; font-weight: bold; margin-left: 6px;">✓</span> فحص شدة التيار الكهربائي واختبار مستوى ضغط غاز الفريون
            </td>
          </tr>
        </table>
      </div>

      <!-- Pricing Comparison -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 32px; border: 1px solid #eef1f6; border-radius: 16px; overflow: hidden;" dir="rtl">
        <tr>
          <td align="center" style="background-color: #f8fafc; padding: 18px 12px; border-bottom: 1px solid #eef1f6; font-size: 14px; color: #64748b; font-weight: 700;">السعر المعتاد</td>
          <td align="center" style="background-color: #fff8f8; padding: 18px 12px; border-bottom: 1px solid #eef1f6; font-size: 14px; color: #e23c2d; font-weight: 700;">سعر العرض</td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 12px; font-size: 16px; color: #94a3b8; text-decoration: line-through; font-weight: bold;">١٥٠ ريال</td>
          <td align="center" style="padding: 20px 12px; font-size: 24px; color: #e23c2d; font-weight: 900; background-color: #fffbfb;">١٢٥ ريال <span style="font-size: 12px; font-weight: 500; color: #64748b;">/ للوحدة</span></td>
        </tr>
      </table>

      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #25d366 0%, #1db954 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(37,211,102,0.25);">احجز الآن عبر الواتساب</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  },

  // ─── 3. EMERGENCY SERVICE ────────────────────────────────────────────────
  {
    id: "emergency",
    icon: "fa-solid fa-truck-fast",
    titleEn: "Emergency",
    titleAr: "خدمة الطوارئ",
    descEn: "Clean visual layout optimized for quick calling.",
    descAr: "قالب طوارئ للصيانة السريعة والاتصال المباشر.",
    subjectEn: "Urgent 24/7 AC Repair Dispatch Team — SuperCool",
    subjectAr: "فريق طوارئ صيانة مكيفات الهواء في الأحساء — ٢٤ ساعة",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Warning Header -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #b91c1c 0%, #e23c2d 100%); padding: 48px 36px; text-align: center; color: #ffffff;">
      <div style="margin-bottom: 20px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <div style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; padding: 6px 14px; border-radius: 30px; margin-bottom: 16px;">Emergency Service Dispatch</div>
      <h1 style="color: #ffffff; font-size: 26px; font-weight: 900; margin: 0 0 12px 0; line-height: 1.3;">Rapid AC Repair Active</h1>
      <p style="color: #fecaca; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 500; max-width: 440px; margin: 0 auto;">Is your AC leaking water, blowing warm air, or not powering on? Our emergency fleet is active.</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px;">
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 28px 0;">During extreme heat conditions in Al Ahsa, an AC failure can become critical. SuperCool AC Services runs a dedicated emergency dispatch team operating 24 hours a day, 7 days a week, including holidays.</p>
      
      <!-- Big Dial Callout Box -->
      <div style="background-color: #fffcfc; border: 1px solid #fecaca; border-radius: 20px; padding: 28px; text-align: center; margin-bottom: 28px;">
        <span style="font-size: 12px; color: #b91c1c; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">Direct Hotlines</span>
        <a href="tel:+966566706358" target="_blank" style="font-size: 28px; font-weight: 900; color: #e23c2d; text-decoration: none; display: block; margin-bottom: 6px;">056 670 6358</a>
        <span style="font-size: 12px; color: #64748b; font-weight: 500;">Click to call now for immediate deployment</span>
      </div>

      <!-- Action Buttons Side by Side -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
        <tr>
          <td class="mobile-col" width="50%" style="padding: 0 8px 0 0;">
            <a class="cta-btn mobile-btn" href="tel:+966566706358" target="_blank" style="background: #0c2b5c; color: #ffffff; padding: 16px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; display: block; font-size: 14px; text-align: center; box-shadow: 0 4px 12px rgba(12,43,92,0.15);">Call Direct Hotline</a>
          </td>
          <td class="mobile-col" width="50%" style="padding: 0 0 0 8px;">
            <a class="cta-btn mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: #25d366; color: #ffffff; padding: 16px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; display: block; font-size: 14px; text-align: center; box-shadow: 0 4px 12px rgba(37,211,102,0.15);">WhatsApp Emergency</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Warning Header -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #b91c1c 0%, #e23c2d 100%); padding: 48px 36px; text-align: center; color: #ffffff;">
      <div style="margin-bottom: 20px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <div style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; padding: 6px 14px; border-radius: 30px; margin-bottom: 16px;">صيانة طارئة وفورية</div>
      <h1 style="color: #ffffff; font-size: 26px; font-weight: 900; margin: 0 0 12px 0; line-height: 1.3;">استجابة سريعة لإصلاح الأعطال</h1>
      <p style="color: #fecaca; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 500; max-width: 440px; margin: 0 auto;">هل يواجه مكيفك مشكلة تسريب مياه أو دفع هواء حار؟ فرق الصيانة الطارئة لدينا مستعدة للتحرك.</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px; text-align: right;">
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 28px 0;">نحن نتفهم صعوبة تعطل المكيف خلال درجات الحرارة المرتفعة في الأحساء والهفوف. لذلك يعمل فريق الطوارئ المتخصص لدينا على مدار ٢٤ ساعة طوال أيام الأسبوع لخدمتكم وإيجاد الحلول فوراً في الموقع.</p>
      
      <!-- Big Dial Callout Box -->
      <div style="background-color: #fffcfc; border: 1px solid #fecaca; border-radius: 20px; padding: 28px; text-align: center; margin-bottom: 28px;">
        <span style="font-size: 12px; color: #b91c1c; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">رقم الاتصال المباشر للطوارئ</span>
        <a href="tel:+966566706358" target="_blank" style="font-size: 28px; font-weight: 900; color: #e23c2d; text-decoration: none; display: block; margin-bottom: 6px;">٠٥٦ ٦٧٠ ٦٣٥٨</a>
        <span style="font-size: 12px; color: #64748b; font-weight: 500;">اضغط للاتصال المباشر لإرسال الفني فوراً</span>
      </div>

      <!-- Action Buttons Side by Side -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;" dir="rtl">
        <tr>
          <td class="mobile-col" width="50%" style="padding: 0 0 0 8px;">
            <a class="cta-btn mobile-btn" href="tel:+966566706358" target="_blank" style="background: #0c2b5c; color: #ffffff; padding: 16px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; display: block; font-size: 14px; text-align: center; box-shadow: 0 4px 12px rgba(12,43,92,0.25);">اتصل بنا مباشرة</a>
          </td>
          <td class="mobile-col" width="50%" style="padding: 0 8px 0 0;">
            <a class="cta-btn mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: #25d366; color: #ffffff; padding: 16px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; display: block; font-size: 14px; text-align: center; box-shadow: 0 4px 12px rgba(37,211,102,0.15);">تواصل معنا عبر واتساب</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  },

  // ─── 4. BOOKING CONFIRMATION ──────────────────────────────────────────────
  {
    id: "booking",
    icon: "fa-solid fa-calendar-check",
    titleEn: "Booking Confirmed",
    titleAr: "تأكيد الحجز",
    descEn: "Ticket-styled layout with details.",
    descAr: "قالب تأكيد موعد الحجز وتفاصيل الفنيين.",
    subjectEn: "Appointment Confirmed — SuperCool AC Services",
    subjectAr: "تم تأكيد موعد صيانة المكيف الخاص بك — سوبر كول",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Green Header -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #0e5a32 0%, #16a34a 100%); padding: 48px 36px; text-align: center; color: #ffffff;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <div style="width: 48px; height: 48px; background-color: rgba(255,255,255,0.2); border-radius: 50%; text-align: center; line-height: 48px; font-size: 20px; font-weight: bold; color: #ffffff; display: inline-block; margin-bottom: 16px;">✓</div>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; line-height: 1.3;">Your Slot is Confirmed</h1>
      <p style="color: #dcfce7; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 500;">Thank you — your appointment has been scheduled</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px;">
      
      <!-- Ticket Stub Design -->
      <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 16px; padding: 24px; margin-bottom: 28px;">
        <h4 style="margin: 0 0 18px 0; color: #0c2b5c; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Appointment Summary</h4>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0; width: 35%;">Service Type</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; border-bottom: 1px solid #e2e8f0; text-align: right;">{{service_type}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Date & Time</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; border-bottom: 1px solid #e2e8f0; text-align: right;">{{booking_date}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Phone Number</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; border-bottom: 1px solid #e2e8f0; text-align: right;">{{phone}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold;">Location</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; text-align: right;">{{location}}</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 28px 0;">Our technicians are scheduled and will arrive within the appointment window. If you need to make changes or reschedule, please click below to text our dispatch desk directly.</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">Manage / Reschedule slot</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Hero Green Header -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #0e5a32 0%, #16a34a 100%); padding: 48px 36px; text-align: center; color: #ffffff;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <div style="width: 48px; height: 48px; background-color: rgba(255,255,255,0.2); border-radius: 50%; text-align: center; line-height: 48px; font-size: 20px; font-weight: bold; color: #ffffff; display: inline-block; margin-bottom: 16px;">✓</div>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; line-height: 1.3;">تم تأكيد حجز موعدك</h1>
      <p style="color: #dcfce7; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 500;">شكراً لك — تم جدولة موعد الخدمة بنجاح</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px; text-align: right;">
      
      <!-- Ticket Stub Design -->
      <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 16px; padding: 24px; margin-bottom: 28px;" dir="rtl">
        <h4 style="margin: 0 0 18px 0; color: #0c2b5c; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">تفاصيل الموعد</h4>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0; width: 35%;">نوع الخدمة</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; border-bottom: 1px solid #e2e8f0; text-align: left;">{{service_type}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0;">التاريخ والوقت</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; border-bottom: 1px solid #e2e8f0; text-align: left;">{{booking_date}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0;">رقم الجوال</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; border-bottom: 1px solid #e2e8f0; text-align: left;">{{phone}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: bold;">الموقع</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; font-weight: 800; text-align: left;">{{location}}</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 14px; line-height: 1.7; color: #475569; margin: 0 0 28px 0;">سيصل فريق الفنيين المعتمدين لدينا في الموعد المحدد أعلاه. إذا كنت ترغب في تعديل تفاصيل الحجز أو تغيير الموعد، يرجى الضغط على الزر أدناه للتواصل مع قسم التنسيق مباشرة عبر الواتساب.</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">تعديل أو إدارة موعدك</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  },

  // ─── 5. MAINTENANCE REMINDER ──────────────────────────────────────────────
  {
    id: "reminder",
    icon: "fa-solid fa-clock",
    titleEn: "Reminder",
    titleAr: "تذكير بالصيانة",
    descEn: "Calendar-styled layout with a prominent date block.",
    descAr: "قالب تذكير بالصيانة الدورية مع تصميم تقويم مميز.",
    subjectEn: "Scheduled AC Maintenance Reminder — SuperCool",
    subjectAr: "تذكير مجدول بالصيانة الوقائية لمكيفك — سوبر كول",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Header -->
    <div style="background-color: #0c2b5c; padding: 28px; text-align: center;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px;">
      
      <!-- Calendar Icon Block -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
        <tr>
          <td align="center">
            <div style="width: 110px; background-color: #ffffff; border: 2px solid #e2a017; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 18px rgba(226,160,23,0.12);">
              <div style="background-color: #e2a017; color: #ffffff; padding: 6px 12px; font-size: 11px; font-weight: 850; text-transform: uppercase; letter-spacing: 1.5px;">Schedule</div>
              <div style="padding: 16px 12px; font-size: 26px; font-weight: 900; color: #0c2b5c; line-height: 1;">AC</div>
            </div>
          </td>
        </tr>
      </table>

      <h2 style="color: #0c2b5c; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; text-align: center; letter-spacing: -0.5px;">Time for Seasonal AC Care</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; text-align: center;">Regular preventative maintenance keeps your cooling systems operating at maximum efficiency, avoiding costly breakdowns and lowering utility bills.</p>
      
      <!-- Recommended Slot Info Box -->
      <div style="background-color: #fafbfc; border: 1px solid #edf2f7; border-radius: 16px; padding: 22px; margin-bottom: 28px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: bold; width: 40%;">Recommended System</td>
            <td style="padding: 6px 0; font-size: 13px; color: #0c2b5c; font-weight: 800;">{{service_type}}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: bold;">Recommended Date</td>
            <td style="padding: 6px 0; font-size: 13px; color: #0c2b5c; font-weight: 800;">{{booking_date}}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: bold;">Location Segment</td>
            <td style="padding: 6px 0; font-size: 13px; color: #0c2b5c; font-weight: 800;">{{location}}</td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">Confirm Appointment Slot</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Header -->
    <div style="background-color: #0c2b5c; padding: 28px; text-align: center;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px; text-align: right;">
      
      <!-- Calendar Icon Block -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
        <tr>
          <td align="center">
            <div style="width: 110px; background-color: #ffffff; border: 2px solid #e2a017; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 18px rgba(226,160,23,0.12);">
              <div style="background-color: #e2a017; color: #ffffff; padding: 6px 12px; font-size: 11px; font-weight: 850; text-transform: uppercase; letter-spacing: 1.5px;">الموعد</div>
              <div style="padding: 16px 12px; font-size: 26px; font-weight: 900; color: #0c2b5c; line-height: 1;">تذكير</div>
            </div>
          </td>
        </tr>
      </table>

      <h2 style="color: #0c2b5c; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; text-align: center;">حان موعد صيانة مكيف الهواء الوقائية</h2>
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 24px 0; text-align: center;">الصيانة الدورية الوقائية تزيد من كفاءة تدفق الهواء، وتخفض قيمة فواتير الكهرباء وتطيل العمر الافتراضي لأجهزتك بنسبة كبيرة.</p>
      
      <!-- Recommended Slot Info Box -->
      <div style="background-color: #fafbfc; border: 1px solid #edf2f7; border-radius: 16px; padding: 22px; margin-bottom: 28px;" dir="rtl">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: bold; width: 40%; text-align: right;">النظام الموصى بفحصه</td>
            <td style="padding: 6px 0; font-size: 13px; color: #0c2b5c; font-weight: 800; text-align: left;">{{service_type}}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: bold; text-align: right;">التاريخ المقترح</td>
            <td style="padding: 6px 0; font-size: 13px; color: #0c2b5c; font-weight: 800; text-align: left;">{{booking_date}}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: bold; text-align: right;">المنطقة / الموقع</td>
            <td style="padding: 6px 0; font-size: 13px; color: #0c2b5c; font-weight: 800; text-align: left;">{{location}}</td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">تأكيد موعد الصيانة الوقائية</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  },

  // ─── 6. FESTIVAL OFFER ────────────────────────────────────────────────────
  {
    id: "festival",
    icon: "fa-solid fa-star",
    titleEn: "Festival Offer",
    titleAr: "عرض الأعياد",
    descEn: "Luxury gold-accented celebration layout.",
    descAr: "قالب الأعياد والمناسبات الفاخر بالتفاصيل الذهبية.",
    subjectEn: "Eid Mubarak! Celebrate with Clean Air — Exclusive AC Offer inside",
    subjectAr: "عيدكم مبارك! عروض خاصة وخصومات صيانة المكيفات بمناسبة العيد",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 2px solid #d4af37;">
    
    <!-- Gold / Dark Blue Hero Banner -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #061730 0%, #0c2b5c 100%); padding: 52px 36px; text-align: center; border-bottom: 3px solid #d4af37;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <h1 style="color: #d4af37; font-size: 32px; font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">Eid Mubarak</h1>
      <p style="color: #ffffff; font-size: 15px; margin: 0; line-height: 1.5; font-weight: 500;">Wishing you and your family a peaceful holiday</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px;">
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; text-align: center;">Make your home ready for guests with perfect, clean cooling. During this festive holiday season, SuperCool is pleased to offer our clients an exclusive seasonal discount on preventative AC care.</p>
      
      <!-- Big Golden Discount Callout -->
      <div style="background-color: #fcfbf7; border: 1px solid #f2e6c2; border-radius: 20px; padding: 32px; text-align: center; margin-bottom: 28px;">
        <span style="font-size: 12px; color: #d4af37; font-weight: 850; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 8px;">Exclusive Holiday Offer</span>
        <span style="font-size: 42px; font-weight: 900; color: #0c2b5c; display: block; line-height: 1;">20% OFF</span>
        <span style="font-size: 12px; color: #64748b; font-weight: 600; display: block; margin-top: 8px;">Full Deep Pressure Wash & Gas Calibration</span>
      </div>

      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0; text-align: center;">Keep your guest rooms, salons, and halls cool and fresh for family gatherings in Al Ahsa. Our team is available even during holidays for urgent requests.</p>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 2px solid #d4af37;">
    
    <!-- Gold / Dark Blue Hero Banner -->
    <div class="hero-pad" style="background: linear-gradient(135deg, #061730 0%, #0c2b5c 100%); padding: 52px 36px; text-align: center; border-bottom: 3px solid #d4af37;">
      <div style="margin-bottom: 24px;">
        <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
      </div>
      <h1 style="color: #d4af37; font-size: 30px; font-weight: 900; margin: 0 0 12px 0; line-height: 1.2;">عيدكم مبارك وعساكم من عواده</h1>
      <p style="color: #ffffff; font-size: 15px; margin: 0; line-height: 1.5; font-weight: 500;">نتمنى لكم ولعائلاتكم عيداً سعيداً ومباركاً</p>
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px; text-align: right;">
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 24px 0; text-align: center;">جهز مجلسك وصالتك لاستقبال ضيوفك بهواء بارد ونقي. يسر سوبر كول تقديم باقات عروض وخصومات مخصصة بمناسبة العيد السعيد تضمن لكم الراحة القصوى.</p>
      
      <!-- Big Golden Discount Callout -->
      <div style="background-color: #fcfbf7; border: 1px solid #f2e6c2; border-radius: 20px; padding: 32px; text-align: center; margin-bottom: 28px;">
        <span style="font-size: 12px; color: #d4af37; font-weight: 850; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 8px;">خصم خاص بمناسبة العيد</span>
        <span style="font-size: 42px; font-weight: 900; color: #0c2b5c; display: block; line-height: 1;">خصم ٢٠٪</span>
        <span style="font-size: 12px; color: #64748b; font-weight: 600; display: block; margin-top: 8px;">على الغسيل العميق وتعبئة وضبط فريون المكيفات</span>
      </div>

      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0; text-align: center;">حافظ على برودة ونقاء هواء مجالس الضيوف أثناء التجمعات والاحتفالات العائلية بالأحساء. فريقنا متواجد لخدمتكم طيلة فترة إجازة العيد.</p>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  },

  // ─── 7. THANK YOU ─────────────────────────────────────────────────────────
  {
    id: "thankyou",
    icon: "fa-solid fa-heart",
    titleEn: "Thank You",
    titleAr: "شكراً لك",
    descEn: "Minimal letter-style review collection layout.",
    descAr: "قالب شكر وتقدير وجمع آراء العملاء.",
    subjectEn: "Thank You for Choosing SuperCool AC Services",
    subjectAr: "شكراً لاختياركم خدمات سوبر كول — نود معرفة رأيكم",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Minimal Clean Header -->
    <div style="padding: 40px 32px 20px 32px; text-align: center;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block;" />
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 24px 32px 36px 32px; text-align: center;">
      
      <!-- Gold Stars Rating Visual -->
      <div style="margin-bottom: 24px; text-align: center;">
        <span style="font-size: 28px; color: #f59e0b; letter-spacing: 4px;">★★★★★</span>
      </div>

      <h2 style="color: #0c2b5c; font-size: 24px; font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.5px;">We Appreciate Your Business</h2>
      
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 auto 24px auto; max-width: 480px;">Thank you for choosing SuperCool AC Services for your recent <strong style="color: #0c2b5c;">{{service_type}}</strong>. Your satisfaction is our absolute priority.</p>
      
      <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin: 0 auto 32px auto; max-width: 480px;">If you have any feedback or reviews on the work performed by our technician fleet, we would love to hear from you. Click below to share your experience on WhatsApp.</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">Share Your Feedback</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Minimal Clean Header -->
    <div style="padding: 40px 32px 20px 32px; text-align: center;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block;" />
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 24px 32px 36px 32px; text-align: center;">
      
      <!-- Gold Stars Rating Visual -->
      <div style="margin-bottom: 24px; text-align: center;">
        <span style="font-size: 28px; color: #f59e0b; letter-spacing: 4px;">★★★★★</span>
      </div>

      <h2 style="color: #0c2b5c; font-size: 24px; font-weight: 800; margin: 0 0 12px 0;">نقدّر ونشكر ثقتكم بنا</h2>
      
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 auto 24px auto; max-width: 480px;">نشكركم على اختيار سوبر كول لتنفيذ خدمة <strong style="color: #0c2b5c;">{{service_type}}</strong>. رضاكم التام هو دافعنا الدائم للتطوير والارتقاء بخدماتنا.</p>
      
      <p style="font-size: 14px; line-height: 1.7; color: #64748b; margin: 0 auto 32px auto; max-width: 480px;">يسعدنا معرفة تقييمكم لأداء فنيينا وملاحظاتكم على جودة الخدمة المقدمة. يرجى الضغط على الزر أدناه لمشاركتنا رأيكم مباشرة عبر الواتساب.</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">أرسل تقييمك وملاحظاتك</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  },

  // ─── 8. CUSTOM CAMPAIGN ───────────────────────────────────────────────────
  {
    id: "custom",
    icon: "fa-solid fa-pen-nib",
    titleEn: "Custom",
    titleAr: "قالب مخصص",
    descEn: "Flexible luxury layout with custom canvas.",
    descAr: "قالب مرن فارغ لكتابة الرسائل والحملات الخاصة.",
    subjectEn: "SuperCool AC Services",
    subjectAr: "سوبر كول لخدمات التكييف والتبريد",
    htmlEn: `${RESPONSIVE_CSS}
<div class="outer-wrapper" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Elegant Corporate Header -->
    <div style="background-color: #0c2b5c; padding: 32px; text-align: center;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="SuperCool Logo" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px;">
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">Hello,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">[Write your custom message here]</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">Contact Support</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionEn()}

    <!-- Premium Footer -->
    ${getFooterEn()}
  </div>
</div>`,
    htmlAr: `${RESPONSIVE_CSS}
<div class="outer-wrapper" dir="rtl" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 40px 20px; color: #1e293b; text-align: right;">
  <div class="inner-card" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #eef1f6;">
    
    <!-- Elegant Corporate Header -->
    <div style="background-color: #0c2b5c; padding: 32px; text-align: center;">
      <img src="https://supercoolalhasa.shop/images/l2.png" alt="سوبر كول" style="height: 100px; width: auto; display: inline-block; filter: brightness(0) invert(1);" />
    </div>

    <!-- Main Content Body -->
    <div class="body-pad" style="padding: 36px 32px; text-align: right;">
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 20px 0;">مرحباً بك،</p>
      <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 24px 0;">[اكتب رسالتك المخصصة هنا]</p>
      
      <!-- CTA -->
      <div style="text-align: center; margin-bottom: 8px;">
        <a class="mobile-btn" href="https://wa.me/966566706358" target="_blank" style="background: linear-gradient(135deg, #164a8a 0%, #0c2b5c 100%); color: #ffffff; padding: 16px 36px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(12,43,92,0.25);">تواصل مع الدعم الفني</a>
      </div>
    </div>

    <!-- Trust Seals -->
    ${getTrustSectionAr()}

    <!-- Premium Footer -->
    ${getFooterAr()}
  </div>
</div>`
  }
];
