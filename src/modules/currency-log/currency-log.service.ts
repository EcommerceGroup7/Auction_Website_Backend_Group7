import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../currency/entities/currency.entity';
import { CreateCurrencyLogInput } from './dto/create-currency-log.input';
import { CurrencyLog } from './entities/currency-log.entity';

@Injectable()
export class CurrencyLogService {
  
  constructor(
    @InjectRepository(CurrencyLog)
    private readonly currencyLogRepository: Repository<CurrencyLog>
  ) {}

  async genCurrencyLog(currency: Currency, value: string) : Promise<CurrencyLog> {
    const { Total_Money } = currency;

    const newLog = new CurrencyLog();
    newLog.Total_Amount = Total_Money;
    newLog.Currency = currency;
    newLog.Currency_Log_Value = value;

    return await this.currencyLogRepository.save(newLog);
  }

  async getLastCurrencyLog(User_ID: string)
  : Promise<CurrencyLog[]> {
    let currencyLog = await this.currencyLogRepository.find({
      relations: { Currency: true }
    });
    
    const result = currencyLog.filter(cL => cL.Currency.User_ID.User_ID === User_ID);
    return result.slice(0, 5);
  }
}
