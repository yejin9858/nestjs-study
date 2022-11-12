import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; //private로 안하면 다른 코드에서 수정할 수 있게 됨
    
    getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(createBoardDto : CreateBoardDto){
        const{title, description} = createBoardDto;
        const board : Board= {
            id : uuid,
            title,
            description,
            status : BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id : String) : Board {
        return this.boards.find((board) => board.id === id)
    }

    deleteBoard(id : String) : void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }
}
