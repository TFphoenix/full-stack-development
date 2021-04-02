import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageDetails {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    recognitionResult: string;

    @Column()
    downloadLink: string;
}