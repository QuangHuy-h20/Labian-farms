import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

const ModalComponent = ({ open, onClose, children }: any) => {


  const cancelButtonRef = useRef(null)
  return (

    <Transition show={open} as={Fragment}>
      <Dialog open={open} onClose={onClose} as="div" initialFocus={cancelButtonRef} className="fixed inset-0 z-50 overflow-y-auto" static>

        <div className="min-h-full md:p-5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-full h-full" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block min-w-content max-w-full text-start align-middle transition-all relative">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>

  )
};

export default ModalComponent;
