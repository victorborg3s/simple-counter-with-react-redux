import React from 'react';

interface UpdateDataNotificationProps {
  children: React.ReactNode,
}

function UpdateDataNotification({ children }: UpdateDataNotificationProps) {
  return (
    <section>
      <header>
        <h1>{children}</h1>
      </header>
    </section>
  );
}

export default UpdateDataNotification;
