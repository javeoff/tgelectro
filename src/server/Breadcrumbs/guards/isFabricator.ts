import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

export const isFabricator = (entity: unknown): entity is Fabricator =>
  entity !== null && typeof entity === 'object' && 'products' in entity && !('parent' in entity);
