import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { capitalizeFirstLetterOfEachWordInAPhrase } from 'src/helpers/capitalize';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const roleService = new RolesService(this.prismaService);
    const organizationService = new OrganizationsService(this.prismaService);

    await roleService.findOne(createUserDto.role_id);
    await organizationService.findOne(createUserDto.organization_id);

    createUserDto.name = capitalizeFirstLetterOfEachWordInAPhrase(
      createUserDto.name,
    );

    if (await this.checkIfEmailExist(createUserDto.email)) {
      throw new BadRequestException('This email already exists');
    }
    if (await this.checkIfMobileExist(createUserDto.mobile)) {
      throw new BadRequestException('This mobile number already exists');
    }

    createUserDto.password = await hash(createUserDto.password, 10);
    return this.prismaService.user.create({ data: createUserDto });
    //return 'This action adds a new user';
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return this.getUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.getUserById(id);

    const roleService = new RolesService(this.prismaService);
    const organizationService = new OrganizationsService(this.prismaService);

    await roleService.findOne(updateUserDto.role_id);
    await organizationService.findOne(updateUserDto.organization_id);

    if (updateUserDto.name) {
      updateUserDto.name = capitalizeFirstLetterOfEachWordInAPhrase(
        updateUserDto.name,
      );
    }
    if (!(await this.checkIfEmailExist(updateUserDto.email))) {
      throw new BadRequestException('This email already exists');
    }

    if (!(await this.checkIfMobileExist(updateUserDto.mobile))) {
      throw new BadRequestException('This mobile number already exists');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.getUserById(id);
    return this.prismaService.user.delete({ where: { id } });
  }
  private async checkIfEmailExist(
    email: string,
    id?: number,
  ): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }
  private async getUserById(id: number) {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return user;
  }

  private async checkIfMobileExist(
    mobile: string,
    id?: number,
  ): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { mobile },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }

  private async checkIfUserExist(name: string, id?: number): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: { name },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }
}
