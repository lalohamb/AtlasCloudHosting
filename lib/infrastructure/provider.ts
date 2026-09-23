/**
 * Provider-neutral infrastructure interface.
 *
 * Atlas business logic must depend on this interface, not on any specific
 * provider SDK. This prevents Phase 3 from embedding DigitalOcean API calls
 * throughout unrelated business logic.
 *
 * The first concrete implementation will be DigitalOceanProvider (Phase 3).
 */

export interface ComputeSpec {
  region: string;
  memory_mb: number;
  cpu_units: number;
  storage_gb: number;
  tags?: string[];
}

export interface ProviderResource {
  provider_resource_id: string;
  resource_type: string;
  region: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface IInfrastructureProvider {
  readonly providerName: string;

  createCompute(spec: ComputeSpec): Promise<ProviderResource>;
  deleteCompute(providerResourceId: string): Promise<void>;
  getResource(providerResourceId: string): Promise<ProviderResource | null>;
  getResourceStatus(providerResourceId: string): Promise<string>;
  createNetwork(region: string, name: string): Promise<ProviderResource>;
  createFirewall(name: string, rules: unknown[]): Promise<ProviderResource>;
}

/**
 * Stub implementation — used in development and tests when no real provider is configured.
 * Never provisions actual infrastructure.
 */
export class StubInfrastructureProvider implements IInfrastructureProvider {
  readonly providerName = 'stub';

  async createCompute(_spec: ComputeSpec): Promise<ProviderResource> {
    throw new Error('StubInfrastructureProvider: no real infrastructure provider configured');
  }

  async deleteCompute(_id: string): Promise<void> {
    throw new Error('StubInfrastructureProvider: no real infrastructure provider configured');
  }

  async getResource(_id: string): Promise<ProviderResource | null> {
    return null;
  }

  async getResourceStatus(_id: string): Promise<string> {
    return 'unknown';
  }

  async createNetwork(_region: string, _name: string): Promise<ProviderResource> {
    throw new Error('StubInfrastructureProvider: no real infrastructure provider configured');
  }

  async createFirewall(_name: string, _rules: unknown[]): Promise<ProviderResource> {
    throw new Error('StubInfrastructureProvider: no real infrastructure provider configured');
  }
}
