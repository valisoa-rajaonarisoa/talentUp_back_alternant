import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("talentalternant")
export class TalentAlternant {
  @PrimaryColumn({
    name: "keycloakId",
    type: "uuid",
    nullable: false,
    unique: true,
  })
  keycloakId!: string;

  @Column({ name: "username", type: "jsonb", nullable: false, unique: true })
  username!: string;

  @Column({ name: "email", type: "jsonb", nullable: false, unique: true })
  email!: string;

  @Column({ name: "lastname", type: "jsonb", nullable: false })
  lastname!: string;

  @Column({ name: "firstname", type: "jsonb", nullable: false })
  firstname!: string;

  @Column({ name: "adresse", type: "jsonb", nullable: false })
  adresse!: string;

  @CreateDateColumn({ name: "createdAt", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updateAt", type: "timestamp with time zone" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deletedAt", type: "timestamp with time zone" })
  deletedAt!: Date;
}
