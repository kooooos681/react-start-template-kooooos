import React from 'react';
import { FunctionalRegistration } from '../components/Registration/FunctionalRegistration';
import styles from './RegistrationPage.module.css';

export const RegistrationPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2>Functional Component Registration</h2>
        <FunctionalRegistration />
      </div>
      <div className={styles.section}>
        <h2>RTK Query Registration</h2>
      </div>
    </div>
  );
};
