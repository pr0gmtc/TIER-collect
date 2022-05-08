<<<<<<< HEAD
import * as React from 'react';
import { Drawer } from 'react-native-paper';

const SideDrawer = () => {
    const [active, setActive] = React.useState('');


    return (
        <Drawer.Section title="Some title">
            <Drawer.Item
                label="First Item"
                active={active === 'first'}
                onPress={() => setActive('first')}
            />
            <Drawer.Item
                label="Second Item"
                active={active === 'second'}
                onPress={() => setActive('second')}
            />
        </Drawer.Section>
    );
};

export default SideDrawer;
=======
import * as React from 'react';
import { Drawer } from 'react-native-paper';

const SideDrawer = () => {
  const [active, setActive] = React.useState('');


  return (
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};

export default SideDrawer;
>>>>>>> 69eddd244575f141b3613fb9fe96f7f8e309f6c6
