import mongoose, { Schema } from 'mongoose';

export interface IMongoTransaction {
  type: string;
  amount: number;
  date: Date;
}

export interface IMongoWallet {
  userId: mongoose.Schema.Types.ObjectId;
  balance: number;
  transaction: IMongoTransaction[];
  createdAt: Date;
  updatedAt: Date;
}

const walletSchema: Schema<IMongoWallet> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transaction: [
      {
        type: {
          type: String,
          enum: ['Debit', 'Credit', 'Refund', 'Referral'],
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const WalletModel = mongoose.model('Wallet', walletSchema);
export default WalletModel;
