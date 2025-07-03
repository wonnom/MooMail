from settings import *
from moomoo import *
import numpy as np
import json





class Account:

    def init_context(self):
        self.trade_context = OpenSecTradeContext(filter_trdmarket=TRADING_MARKET, host=OPEND_ADDRESS, port=OPEND_PORT, security_firm=SECURITY_FIRM)
        return self.trade_context.get_login_user_id()


    def get_assets_info(self):
        ret, data = self.trade_context.accinfo_query(trd_env=TRADING_ENVIRONMENT, acc_id=0, acc_index=0, refresh_cache=False, currency=CURRENCY)
        if ret == RET_OK:
            # print(data)
            return data
            # print(data['power'][0])  # Get the first buying power
            # print(data['power'].values.tolist())  # convert to list
        else:
            print('accinfo_query error: ', data)

    def get_positions_info(self):
        ret, data = self.trade_context.position_list_query()
        if ret == RET_OK:
            # print(data.__dict__)
            # print(data)
            # print(data['pl_ratio_avg_cost'])  # Convert to list
            return data
        else:
            print('position_list_query error: ', data)

    def close(self):
        self.trade_context.close()


class send:

    def user_id(user_id):
        user_idDict = {"user_id" : user_id}
        return user_idDict
    
    def currency():
        currencyDict = {"currency" : CURRENCY}
        return currencyDict

    def assets(assets_info):
        assets = round(assets_info['total_assets'].values[0], 2)
        # print(assets_info.__dict__)
        dict = {"assets" : assets}
        return dict
        print(json.dumps(dict))

    def unrealized_pl(positions_info):
        unrealized_pl = round(sum(positions_info['unrealized_pl'].values), 2)
        dict = {"unrealized_pl" : unrealized_pl}
        return dict
        print(json.dumps(dict))

    def cash_bp(assets_info):
        cash = assets_info['cash'].values[0]
        funds = assets_info['fund_assets'].values[0]
        cash_bp = round(cash + funds, 2)
        dict = {"cash_bp" : cash_bp}
        return dict
        print(json.dumps(dict))

    def holdings(positions_info, assets_info):
        # print(positions_info['stock_name'], positions_info['market_val'], positions_info['qty'], positions_info['market_val']/ positions_info['qty'], 
        #       positions_info['average_cost'], positions_info['unrealized_pl'], positions_info['realized_pl'], round(positions_info['market_val']/ assets_info['total_assets'].values[0] * 100, 0))
        # print(type(positions_info['stock_name'].values))
        stock_name = positions_info['stock_name'].values
        market_val = np.round(positions_info['market_val'].values, 2)
        qty = positions_info['qty'].values

        holdings = [{"stock_name": stock_name,"market_val": market_val, "qty": qty }
                     for stock_name, market_val, qty in zip(stock_name, market_val, qty)
                     ]
        
        return holdings

        

###initialization
account = Account()
user_id = account.init_context()
assets_info = account.get_assets_info()
positions_info = account.get_positions_info()
# print(assets_info['securities_assets'].values[0])

###get the relevant data and convert them into dictionaries to be sent
user_id = send.user_id(user_id)
currency = send.currency()
assets = send.assets(assets_info)
unrealized_pl = send.unrealized_pl(positions_info)
cash_bp = send.cash_bp(assets_info)
holdings = send.holdings(positions_info, assets_info)

###gather list of dictionaries and stdout
data = [user_id, currency, assets, unrealized_pl, cash_bp, holdings]
print(json.dumps(data))


account.close()
