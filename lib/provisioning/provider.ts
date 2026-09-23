/**
 * Provider-neutral deployment interface.
 *
 * Atlas may use Coolify as the first deployment provider (Phase 4).
 * Business logic must depend on this interface, not on Coolify directly.
 */

export interface DeploymentSpec {
  application_id: string;
  environment_id: string;
  source_type: 'git' | 'image' | 'manual';
  source_reference: string;
  commit_sha?: string;
  environment_variables?: Record<string, string>;
}

export interface DeploymentResult {
  provider_deployment_id: string;
  status: string;
  url?: string;
}

export interface IDeploymentProvider {
  readonly providerName: string;

  deployApplication(spec: DeploymentSpec): Promise<DeploymentResult>;
  getDeploymentStatus(providerDeploymentId: string): Promise<string>;
  restartApplication(providerDeploymentId: string): Promise<void>;
  deleteApplication(providerDeploymentId: string): Promise<void>;
}

/**
 * Stub implementation — used in development and tests.
 * Never performs actual deployments.
 */
export class StubDeploymentProvider implements IDeploymentProvider {
  readonly providerName = 'stub';

  async deployApplication(_spec: DeploymentSpec): Promise<DeploymentResult> {
    throw new Error('StubDeploymentProvider: no real deployment provider configured');
  }

  async getDeploymentStatus(_id: string): Promise<string> {
    return 'unknown';
  }

  async restartApplication(_id: string): Promise<void> {
    throw new Error('StubDeploymentProvider: no real deployment provider configured');
  }

  async deleteApplication(_id: string): Promise<void> {
    throw new Error('StubDeploymentProvider: no real deployment provider configured');
  }
}
