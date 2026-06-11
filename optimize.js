const fs = require('fs');

let html = fs.readFileSync('free-id.html', 'utf8');

const schema = `
    <!-- Schema.org Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "登录时显示账号“已锁定”或“已停用”该如何解决？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "因为共享账号使用人数过多，触发了苹果风控机制。请等待我们系统自动更新释放新的账号即可，绝对不要尝试通过你自己的手机号解锁！"
          }
        },
        {
          "@type": "Question",
          "name": "我可以像使用自己的 ID 一样直接登录系统的 iCloud 吗？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "绝对不行！登录 iCloud 可能会导致设备被恶意锁机，所有照片和私密数据都会受到威胁。只能在 App Store 登录下载应用！"
          }
        },
        {
          "@type": "Question",
          "name": "如何更新使用共享账号下载的海外 App？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "当 App 需要更新时，通常需要重新输入下载该应用时的 Apple ID 密码。如果嫌麻烦，可以直接卸载该应用，然后使用我们提供的最新共享账号重新下载。"
          }
        }
      ]
    }
    </script>
</head>`;
html = html.replace('</head>', schema);

const banner = `            </div>
            
            <div class="promo-banner" style="background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border: 2px dashed #F59E0B; padding: 1.5rem; border-radius: 12px; margin-top: 2rem; text-align: left; display: flex; flex-direction: column; gap: 1rem; box-shadow: 4px 4px 0px rgba(68, 64, 60, 0.1);">
                <h3 style="color: #D97706; margin-bottom: 0;">🔥 进阶需求推荐</h3>
                <p style="margin: 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <span><strong>嫌共享账号排队麻烦？</strong> 购买专属私人美区 Apple ID，安全独享，支持修改密码与密保。</span>
                    <a href="javascript:alert('您可以将此链接替换为您发卡网的商品链接');" class="btn-sm btn-primary" style="background-color: #D97706; border-color: #B45309;">👉 点击购买 (专属 9 折)</a>
                </p>
                <p style="margin: 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-top: 1px dashed #FCD34D; padding-top: 1rem;">
                    <span><strong>有了账号还需要魔法梯子？</strong> 下载海外 App、畅享全球流媒体必备的高速稳定节点。</span>
                    <a href="index.html" class="btn-sm btn-primary">⚡ 查看推荐机场</a>
                </p>
            </div>
        </section>`;
html = html.replace('        </section>', banner);

for(let i=1; i<=6; i++) {
    html = html.replace(`onclick="navigator.clipboard.writeText(document.getElementById('acc${i}').innerText); alert('账号复制成功！');"`, `onclick="copyText(document.getElementById('acc${i}').innerText, this)"`);
    html = html.replace(`onclick="navigator.clipboard.writeText(document.getElementById('pwd${i}').innerText); alert('密码复制成功！');"`, `onclick="copyText(document.getElementById('pwd${i}').innerText, this)"`);
}

const script = `
<script>
function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✅ 已复制';
        btn.style.backgroundColor = '#16A34A';
        btn.style.color = '#FFF';
        btn.style.borderColor = '#16A34A';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    }).catch(err => {
        alert('复制失败，请手动复制');
    });
}
</script>
</body>`;
html = html.replace('</body>', script);

fs.writeFileSync('free-id.html', html, 'utf8');
console.log('Optimized free-id.html successfully!');
