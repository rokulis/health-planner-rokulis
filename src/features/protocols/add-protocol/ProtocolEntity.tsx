import { useMedicinesQuery } from '@/features/medicine/hooks/useMedicinesQuery';
import { ProtocolForm } from '@/features/protocols/add-protocol/ProtocolForm';
import { useProtocolQuery } from '@/features/protocols/hooks/useProtocolQuery';

interface Props {
  protocolId?: string;
}

export const ProtocolEntity: React.FC<Props> = ({ protocolId }) => {
  const { data: medicines } = useMedicinesQuery();
  const { data: protocol } = useProtocolQuery(protocolId);

  if (protocolId && !protocol) {
    return <div>Loading protocol data...</div>;
  }

  return <ProtocolForm protocol={protocol} medicines={medicines} />;
};
