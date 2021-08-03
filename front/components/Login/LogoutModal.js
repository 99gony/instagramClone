import React from 'react';
import { Modal } from 'antd';

const LogoutModal = () => {

  return (
    <>
      <Modal
        closable={false}
        title="로그아웃 중"
      >
        <p>다시 로그인 해야합니다.</p>
      </Modal>
    </>
  );
};

export default LogoutModal;