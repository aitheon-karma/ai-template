import Container, { Service, Inject } from 'typedi';
import { Transporter, TransporterService, Action, Event, param } from '@aitheon/transporter';

@Service()
@Transporter()
export class NotUsedService extends TransporterService {

  constructor() {
    super(Container.get('TransporterBroker'));
  }

  @Action()
  async myAction(): Promise<any> {
    console.log('myAction');
    return { data: true };
  }

  @Event()
  async myEvent(data: any) {
    console.log('myEvent');
  }

}
