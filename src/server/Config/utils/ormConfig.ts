import { ConfigService } from '@server/Config/services/config.service';
import { getOrmService } from '@server/Config/utils/getOrmService';

const ormConfig = getOrmService(new ConfigService());

export default ormConfig;
