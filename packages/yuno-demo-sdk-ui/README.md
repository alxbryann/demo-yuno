# Yuno Payment SDK

A lightweight TypeScript SDK for integrating payment processing and user management into your frontend applications.

## Installation

```sh
npm install yuno-demo-sdk-core
```

## Quick Start

### Initialize a Payment

```typescript
import { startPayment, type StartPaymentRequest } from 'yuno-demo-sdk-core';

const request: StartPaymentRequest = {
  amount: 9999,
  currency: 'USD',
  customerId: 'user-123'
};

const response = await startPayment(request);
console.log(response.data.paymentId);
```

## Core Features

- **Payment Management** - Start, continue, and track payments
- **User Management** - Create and retrieve user data
- **Style Configuration** - Customize payment interface styling
- **Type-Safe** - Full TypeScript support with type definitions
- **Minimal** - Simple, functional API with no dependencies

## API Reference

### Payment APIs

#### `startPayment(request, options?)`

Initiates a new payment process.

**Parameters:**
- `request: StartPaymentRequest`
  - `amount?: number` - Payment amount in cents
  - `currency?: string` - ISO 4217 currency code
  - `customerId?: string` - Unique customer identifier

**Returns:** `Promise<startPaymentResponse>`

```typescript
const response = await startPayment({
  amount: 5000,
  currency: 'USD',
  customerId: 'cust-456'
});
```

#### `continuePayment(request, options?)`

Continues an existing payment with a payment method token.

**Parameters:**
- `request: ContinuePaymentRequest`
  - `paymentId?: string` - Payment identifier from startPayment
  - `paymentMethodToken?: string` - Token from payment method

**Returns:** `Promise<continuePaymentResponse>`

```typescript
const response = await continuePayment({
  paymentId: 'pay-789',
  paymentMethodToken: 'tok-abc123'
});
```

#### `checkStatus(paymentId, options?)`

Retrieves the current status of a payment.

**Parameters:**
- `paymentId: string` - Payment identifier

**Returns:** `Promise<checkStatusResponse>`

```typescript
const response = await checkStatus('pay-789');
console.log(response.data.status); // 'completed', 'pending', etc
```

### User APIs

#### `getAllUsers(options?)`

Returns a list of all registered users.

**Returns:** `Promise<getAllUsersResponse>`

```typescript
const response = await getAllUsers();
console.log(response.data);
```

#### `getUser(name, options?)`

Retrieves a single user by name.

**Parameters:**
- `name: string` - User name

**Returns:** `Promise<getUserResponse>`

```typescript
const response = await getUser('john-doe');
console.log(response.data);
```

#### `createUser(userData, options?)`

Adds a new user to the system.

**Parameters:**
- `userData: string` - User data as JSON string

**Returns:** `Promise<createUserResponse>`

```typescript
const response = await createUser(JSON.stringify({
  name: 'Jane Doe',
  email: 'jane@example.com'
}));
```

### Styling APIs

#### `getStyle(options?)`

Retrieves the styling configuration for the payment interface.

**Returns:** `Promise<getStyleResponse>`

```typescript
const response = await getStyle();
console.log(response.data);
```

#### `saveStyle(styleConfig, options?)`

Saves the styling configuration for the payment interface.

**Parameters:**
- `styleConfig: string` - Style configuration as JSON string

**Returns:** `Promise<saveStyleResponse>`

```typescript
const response = await saveStyle(JSON.stringify({
  primaryColor: '#007bff',
  fontFamily: 'Inter, sans-serif'
}));
```

## Usage Examples

### React Component with Loading State

```typescript
import { useState } from 'react';
import { startPayment } from 'yuno-demo-sdk-core';
import type { StartPaymentRequest } from 'yuno-demo-sdk-core';

export function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const request: StartPaymentRequest = {
        amount: 9999,
        currency: 'USD',
        customerId: 'user-123'
      };

      const response = await startPayment(request);

      if (response.data?.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (err) {
      setError('Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

### Complete Payment Flow

```typescript
import { startPayment, continuePayment, checkStatus } from 'yuno-demo-sdk-core';
import type { StartPaymentRequest, ContinuePaymentRequest } from 'yuno-demo-sdk-core';

export async function completePayment() {
  try {
    // Step 1: Start payment
    const startRes = await startPayment({
      amount: 5000,
      currency: 'USD'
    } as StartPaymentRequest);

    const paymentId = startRes.data.paymentId;
    console.log('Payment started:', paymentId);

    // Step 2: Continue with token (after user selects payment method)
    const continueRes = await continuePayment({
      paymentId,
      paymentMethodToken: 'user-provided-token'
    } as ContinuePaymentRequest);

    // Step 3: Poll payment status
    let status = continueRes.data.status;
    while (status === 'pending') {
      await new Promise(r => setTimeout(r, 2000));
      const statusRes = await checkStatus(paymentId);
      status = statusRes.data.status;
    }

    console.log('Final status:', status);
    return status === 'completed';
  } catch (err) {
    console.error('Payment failed:', err);
    return false;
  }
}
```

### Custom Request Options

```typescript
import { startPayment } from 'yuno-demo-sdk-core';

const response = await startPayment(
  {
    amount: 5000,
    currency: 'USD'
  },
  {
    headers: {
      'Authorization': 'Bearer token-123'
    }
  }
);
```

## Error Handling

All API calls return a response object with status and headers. Handle errors gracefully:

```typescript
import { startPayment } from 'yuno-demo-sdk-core';

async function safePayment() {
  try {
    const response = await startPayment({
      amount: 5000,
      currency: 'USD'
    });

    if (response.status === 200) {
      // Success
      return response.data;
    } else {
      // HTTP error
      console.error('HTTP error:', response.status);
    }
  } catch (error) {
    // Network or parsing error
    console.error('Request failed:', error);
  }
}
```

## Types

```typescript
interface StartPaymentRequest {
  amount?: number;
  currency?: string;
  customerId?: string;
}

interface StartPaymentResponse {
  paymentId?: string;
  status?: string;
  redirectUrl?: string;
}

interface ContinuePaymentRequest {
  paymentId?: string;
  paymentMethodToken?: string;
}

interface PaymentStatusResponse {
  paymentId?: string;
  status?: string;
  lastUpdated?: string;
}
```

## Configuration

The SDK connects to the default backend at `http://52.15.192.69:8080`. To use a different endpoint, you can override the URL functions in the source or submit a request to make this configurable.

## Best Practices

1. **Always handle errors** - Wrap API calls in try-catch blocks
2. **Show loading states** - Use loading indicators while requests are in flight
3. **Validate input** - Ensure required fields are provided before calling APIs
4. **Poll responsibly** - Add delays between status checks to avoid overwhelming the server
5. **Type your code** - Use TypeScript types for better IDE support and safety

## Browser Support

Works in all modern browsers supporting:
- `fetch` API
- ES2015+
- TypeScript 4.0+

## License

MIT

## Support

For issues or feature requests, please contact the development team.
