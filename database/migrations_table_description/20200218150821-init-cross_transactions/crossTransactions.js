// migrations是需要保留历史记录的，所有历史都要记录。
module.exports.crossTransactions = function(Sequelize) {
  const {
    INTEGER,
    DATE,
    STRING,
    NOW
  } = Sequelize;
  const crossTransactions = {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tx_id: {
      type: STRING(64),
      unique: true,
      allowNull: false
    },
    from: {
      type: STRING(64),
      allowNull: false
    },
    to: {
      type: STRING(64),
      allowNull: false
    },
    amount: {
      type: STRING(32),
      allowNull: false
    },
    symbol: {
      type: STRING(32),
      allowNull: false
    },
    memo: {
      type: STRING(64),
      allowNull: true
    },
    time: {
      type: STRING(16),
      allowNull: false
    },
    send_node: {
      type: STRING(32),
      allowNull: false
    },
    receive_node: {
      type: STRING(32),
      allowNull: false
    },
    main_chain_id: {
      type: STRING(16),
      allowNull: false
    },
    issue_chain_id: {
      type: STRING(16),
      allowNull: false
    },
    status: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: 0,
      comment: 'had received'
    },
    createdAt: {
      field: 'created_at',
      type: DATE,
      defaultValue: NOW,
      allowNull: false,
      comment: ''
    },
    updatedAt: {
      field: 'updated_at',
      type: DATE,
      defaultValue: NOW,
      allowNull: false,
      comment: ''
    }
  };
  return crossTransactions;
};
