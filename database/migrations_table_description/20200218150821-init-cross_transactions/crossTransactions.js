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
      allowNull: false
    },
    address: {
      type: STRING(64),
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
    memo: {
      type: STRING(32),
      allowNull: false
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
