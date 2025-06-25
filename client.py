from moomoo import *
from settings import *


class Account:

    def init_context(self):
        self.trade_context = OpenSecTradeContext(filter_trdmarket=TRADING_MARKET, host=OPEND_ADDRESS,
                                                 port=OPEND_PORT, security_firm=SECURITY_FIRM)


    def get_account_info(self):
        ret, data = self.trade_context.accinfo_query(trd_env=TRADING_ENVIRONMENT, acc_id=0, acc_index=0, refresh_cache=False, currency=CURRENCY)
        if ret == RET_OK:
            return data
            # print(data)
            # print(data['power'][0])  # Get the first buying power
            # print(data['power'].values.tolist())  # convert to list
        else:
            print('accinfo_query error: ', data)

            

    def close(self):
        self.trade_context.close()

account = Account()
account.init_context()
data = account.get_account_info()
print(data)
account.close()