# Configuração de DNS — actahub.com.br

## Cloudflare DNS

### Registros Obrigatórios

| Tipo   | Nome             | Conteúdo                          | Proxy  | TTL  |
| ------ | ---------------- | --------------------------------- | ------ | ---- |
| CNAME  | actahub.com.br   | actahubnews.pages.dev             | ✅ ON  | Auto |
| CNAME  | www              | actahub.com.br                    | ✅ ON  | Auto |

### SSL/TLS

- **Modo:** Full (Strict)
- **Always Use HTTPS:** ✅ ON
- **Minimum TLS Version:** 1.2
- **Automatic HTTPS Rewrites:** ✅ ON
- **HSTS:** ✅ ON (max-age=63072000, includeSubDomains, preload)

### Page Rules (Redirect)

| URL Pattern              | Ação              | Destino                     |
| ------------------------ | ----------------- | --------------------------- |
| `www.actahub.com.br/*`   | 301 Redirect      | `https://actahub.com.br/$1` |
| `http://actahub.com.br/*`| 301 Redirect      | `https://actahub.com.br/$1` |

---

## Email DNS (Autoridade & Entregabilidade)

### SPF

```
Tipo: TXT
Nome: actahub.com.br
Conteúdo: v=spf1 include:_spf.google.com ~all
```

> **Nota:** Ajuste o `include:` para o provedor de email escolhido:
> - Google Workspace: `include:_spf.google.com`
> - Resend: `include:amazonses.com`
> - Mailgun: `include:mailgun.org`

### DKIM

```
Tipo: TXT
Nome: google._domainkey (ou o seletor do seu provedor)
Conteúdo: (Gerado pelo provedor de e-mail)
```

> Configure no painel do provedor de e-mail e copie o registro DKIM fornecido.

### DMARC

```
Tipo: TXT
Nome: _dmarc
Conteúdo: v=DMARC1; p=quarantine; rua=mailto:dmarc@actahub.com.br; ruf=mailto:dmarc@actahub.com.br; fo=1
```

> **Nota:** Comece com `p=none` para monitorar, depois mude para `p=quarantine` e eventualmente `p=reject`.

### MX Records (para Google Workspace)

| Prioridade | Servidor                  |
| ---------- | ------------------------- |
| 1          | aspmx.l.google.com       |
| 5          | alt1.aspmx.l.google.com  |
| 5          | alt2.aspmx.l.google.com  |
| 10         | alt3.aspmx.l.google.com  |
| 10         | alt4.aspmx.l.google.com  |

---

## Verificação

Após configurar, valide:

1. **SPF:** `nslookup -type=txt actahub.com.br`
2. **DKIM:** `nslookup -type=txt google._domainkey.actahub.com.br`
3. **DMARC:** `nslookup -type=txt _dmarc.actahub.com.br`
4. **SSL:** `curl -I https://actahub.com.br` (verificar HSTS header)
5. **Redirect:** `curl -I http://www.actahub.com.br` (verificar 301)
6. **MX Toolbox:** [mxtoolbox.com/emailhealth](https://mxtoolbox.com/emailhealth)
