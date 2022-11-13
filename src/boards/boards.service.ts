import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }
    
    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    async createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
        const{title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status : BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number) : Promise<Board> {
        const found = await this.boardRepository.findOne({where: { id }}); //await를 씀으로써 다 찾을 때까지 기다림, 잘못된 값 받기 방지

        if(!found){
            throw new NotFoundException(`Can't find board id ${id}`);
        }
        return found;
    }

    async deleteBoard(id : number) : Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Can't find board id ${id}`);
        }
    }

    async updateBoardStatus(id:number, status : BoardStatus) : Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
