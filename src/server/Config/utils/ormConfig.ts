import { configService } from '@server/Config/services/config.service';
import { getOrmService } from '@server/Config/utils/getOrmService';

const ormConfig = getOrmService(configService);

// eslint-disable-next-line no-console
console.log(ormConfig);

export default ormConfig;
