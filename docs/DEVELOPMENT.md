# 🛠️ Development Guide

## Environment Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- Expo CLI >= 6.0.0
- Git

### IDE Recommendations
- **VS Code** with extensions:
  - React Native Tools
  - TypeScript
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense

## Development Workflow

### 1. Project Structure
```
📦 MobileApp3D/
├── 📱 app/                    # Expo Router v5 pages
│   ├── _layout.tsx           # Root layout
│   ├── (tabs)/               # Tab navigation
│   │   ├── _layout.tsx       # Tab layout
│   │   ├── index.tsx         # Home tab
│   │   ├── search.tsx        # Search tab
│   │   └── profile.tsx       # Profile tab
│   ├── [catalog]/            # Dynamic catalog routes
│   │   ├── _layout.tsx       # Catalog layout
│   │   ├── index.tsx         # Catalog list
│   │   └── [id].tsx          # Catalog detail
│   └── model3d/              # 3D model viewer
│       └── [id].tsx          # 3D model page
```

### 2. Code Style & Standards

#### TypeScript
- Use strict TypeScript
- Define interfaces for all data structures
- Use proper typing for components and functions

#### React Native Components
```tsx
// ✅ Good
interface Props {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

// ❌ Bad
const CustomButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};
```

#### 3D Components
```tsx
// Three.js components should be wrapped properly
const Model3D = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  
  return (
    <Canvas>
      <Suspense fallback={<LoadingModel />}>
        <primitive object={scene} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};
```

### 3. State Management

#### Context Pattern
```tsx
// Context/CatalogContext.tsx
interface CatalogContextType {
  items: CatalogItem[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

// Custom hook
export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return context;
};
```

### 4. API Integration

#### Service Pattern
```tsx
// Service/itemService.ts
export class ItemService {
  private static baseURL = 'https://api.example.com';

  static async getItems(): Promise<CatalogItem[]> {
    try {
      const response = await axios.get(`${this.baseURL}/items`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch items');
    }
  }
}
```

#### Custom Hooks
```tsx
// hooks/useApi.ts
export const useApi = <T>(
  apiCall: () => Promise<T>,
  dependencies: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
```

## Testing

### Unit Testing
```bash
npm install --save-dev jest @testing-library/react-native
```

### Test Example
```tsx
// __tests__/components/ProductItem.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import ProductItem from '../components/ProductItem';

describe('ProductItem', () => {
  const mockItem = {
    id: 1,
    title: 'Test Product',
    price: 99.99
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <ProductItem item={mockItem} onPress={() => {}} />
    );
    
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
  });
});
```

## Performance Optimization

### 3D Performance
- Use `useGLTF.preload()` for important models
- Implement LOD (Level of Detail) for complex models
- Use `useMemo` for expensive calculations
- Optimize textures and geometry

### React Native Performance
- Use `FlatList` for large lists
- Implement proper key props
- Use `React.memo` for component optimization
- Profile with Flipper

## Debugging

### 3D Debugging
```tsx
// Enable debug mode for 3D scenes
const ThreeScene = ({ enableDebug = false }) => {
  return (
    <Canvas>
      {enableDebug && <axesHelper args={[5]} />}
      {enableDebug && <gridHelper args={[10, 10]} />}
      <Model />
    </Canvas>
  );
};
```

### Network Debugging
- Use Flipper Network plugin
- Log API responses in development
- Use proper error boundaries

## Deployment

### Build Process
```bash
# Development build
npx expo run:ios --device
npx expo run:android --device

# Production build
eas build --platform all
```

### Environment Variables
```bash
# .env
API_BASE_URL=https://api.production.com
DEBUG_MODE=false
```

## Common Issues & Solutions

### 1. 3D Model Loading
```tsx
// Handle GLB loading errors
const Model = ({ url }: { url: string }) => {
  const [error, setError] = useState<string | null>(null);
  
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  } catch (err) {
    setError('Failed to load 3D model');
    return <ErrorFallback error={error} />;
  }
};
```

### 2. Memory Management
```tsx
// Cleanup 3D resources
useEffect(() => {
  return () => {
    // Dispose geometries and materials
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  };
}, [scene]);
```

### 3. Navigation Issues
```tsx
// Proper navigation with Expo Router
import { router } from 'expo-router';

const navigateToProduct = (id: string) => {
  router.push(`/catalog/${id}`);
};
```

## Best Practices

1. **Always use TypeScript** - Type safety prevents runtime errors
2. **Error Boundaries** - Wrap components that might fail
3. **Loading States** - Always show loading indicators
4. **Offline Support** - Cache important data
5. **Accessibility** - Add proper accessibility labels
6. **Performance** - Profile and optimize regularly

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Native Performance](https://reactnative.dev/docs/performance)
