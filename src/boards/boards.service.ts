import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; //private로 안하면 다른 코드에서 수정할 수 있게 됨
    
    getAllBoards(): Board[]{
        return this.boards;
    }
}
