import Button from '../Button';
import { BsPlayBtnFill } from 'react-icons/bs';
import Link from 'next/link';
import Popover from '../Popover';

function DemoButton() {
  return (
    <Popover message='Live Demo'>
      <Link href='/demo'>
        <Button>
          <BsPlayBtnFill />
        </Button>
      </Link>
    </Popover>
  );
}

export default DemoButton;
