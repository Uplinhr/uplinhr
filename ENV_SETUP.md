# Frontend Environment Variables Setup

## Crear archivo `.env.local` en la raíz del proyecto `/front`

Copia y pega el siguiente contenido en tu archivo `.env.local`:

```bash
# ============================================
# API BACKEND
# ============================================
# URL del backend para desarrollo local
NEXT_PUBLIC_API_URL=http://localhost:4000

# ============================================
# AUTH0 CONFIGURATION (Opcional - para Google y LinkedIn)
# ============================================
# Obtén estos valores de tu dashboard de Auth0
NEXT_PUBLIC_AUTH0_DOMAIN=tu-tenant.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=tu-spa-client-id-aqui
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.gemit.tech

# ============================================
# PAYMENT GATEWAYS (Opcional - para mostrar en UI)
# ============================================
# MercadoPago
NEXT_PUBLIC_MP_PUBLIC_KEY=tu-mercadopago-public-key

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu-paypal-client-id

# ============================================
# OTROS
# ============================================
# Para desarrollo local, puedes dejar estos vacíos
NEXT_PUBLIC_ENVIRONMENT=development
```

## Pasos para configurar:

### 1. **Para desarrollo local (sin Auth0 aún)**
Solo necesitas:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 2. **Para integrar Auth0 con Google y LinkedIn**

#### En Auth0 Dashboard:
1. Ve a **Applications > Your App > Settings**
2. Copia el `Domain` → `NEXT_PUBLIC_AUTH0_DOMAIN`
3. Copia el `Client ID` → `NEXT_PUBLIC_AUTH0_CLIENT_ID`
4. Ve a **APIs > Your API > Settings**
5. Copia el `Identifier` → `NEXT_PUBLIC_AUTH0_AUDIENCE` (debe ser `https://api.gemit.tech`)

#### Configurar URLs en Auth0:
- **Allowed Callback URLs:**
  ```
  http://localhost:3001
  http://localhost:3001/api/auth/callback
  ```

- **Allowed Logout URLs:**
  ```
  http://localhost:3001
  ```

- **Allowed Web Origins:**
  ```
  http://localhost:3001
  ```

#### Habilitar conexiones sociales:
1. Ve a **Authentication > Social**
2. Habilita **Google** y **LinkedIn**
3. Configura tus credenciales de Google y LinkedIn OAuth

### 3. **Para pagos (MercadoPago y PayPal)**

#### MercadoPago:
- Ve a tu cuenta de MercadoPago
- Obtén tu `Public Key` desde **Credenciales**
- Pon en `NEXT_PUBLIC_MP_PUBLIC_KEY`

#### PayPal:
- Ve a tu cuenta de PayPal Developer
- Obtén tu `Client ID`
- Pon en `NEXT_PUBLIC_PAYPAL_CLIENT_ID`

## Verificación rápida

Después de configurar `.env.local`, verifica que:

1. **Backend esté corriendo:**
   ```bash
   npm run dev  # en la carpeta /back
   ```

2. **Frontend esté corriendo:**
   ```bash
   npm run dev  # en la carpeta /front
   ```

3. **Prueba login local:**
   - Email: `admin@uplin.test`
   - Contraseña: `admin123`

4. **En DevTools (F12) > Network:**
   - Las requests a `http://localhost:4000/api/auth/login` deben devolver **200**
   - Deben incluir header `Access-Control-Allow-Origin: http://localhost:3001`

## Notas importantes

- **`NEXT_PUBLIC_*`**: Estas variables son públicas y se exponen al navegador. Nunca pongas secretos aquí.
- **Auth0 es opcional**: El login local (email/password) funciona sin Auth0.
- **Ngrok es solo para webhooks**: No necesitas ngrok para desarrollo local de auth.
- **Reinicia el servidor**: Después de cambiar `.env.local`, reinicia `npm run dev`.

## Troubleshooting

### Error: "CORS header 'Access-Control-Allow-Origin' missing"
- Verifica que `NEXT_PUBLIC_API_URL=http://localhost:4000` (sin trailing slash)
- Reinicia el backend
- Limpia el cache del navegador (Ctrl+Shift+Delete)

### Error: "Cannot find module '@auth0/auth0-react'"
- Ejecuta: `npm install @auth0/auth0-react`
- Ejecuta: `npm install lucide-react`

### Auth0 buttons no aparecen
- Verifica que `NEXT_PUBLIC_AUTH0_DOMAIN` y `NEXT_PUBLIC_AUTH0_CLIENT_ID` estén configurados
- Si están vacíos, los botones no se mostrarán (es normal para dev local)
