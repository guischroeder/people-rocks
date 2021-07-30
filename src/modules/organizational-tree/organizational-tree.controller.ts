import { Get, JsonController, Param } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { OrganizationTreeService } from './organizational-tree.service';

@Service()
@JsonController('/organizational-tree')
export class OrganizationTreeController {
  constructor(
    @Inject()
    private readonly organizationalTreeService: OrganizationTreeService,
  ) {}

  @Get('/:managerId')
  @OpenAPI({
    summary: 'Get the tree of led-employees/employees below a manager',
  })
  public async getOrganizationalTree(
    @Param('managerId') managerId: string,
  ): Promise<Record<string, unknown>> {
    return await this.organizationalTreeService.getOrganizationalTree(
      managerId,
    );
  }
}
