import * as FC from '~/types';

export function isRoot(msg: FC.Message): msg is FC.Root {
  const body = (msg as FC.Root).data?.body;
  return body && body.schema === 'farcaster.xyz/schemas/v1/root' && typeof body.blockHash == 'string';
}

export function isCast(msg: FC.Message): msg is FC.Cast {
  return isCastShort(msg) || isCastRemove(msg) || isCastRecast(msg);
}

export function isCastShort(msg: FC.Message): msg is FC.CastShort {
  const body = (msg as FC.CastShort).data?.body;
  return (
    body &&
    body.schema === 'farcaster.xyz/schemas/v1/cast-short' &&
    typeof body.text === 'string' &&
    !!body.embed &&
    Array.isArray(body.embed.items)
  );
}

export function isCastRemove(msg: FC.Message): msg is FC.CastRemove {
  const body = (msg as FC.CastRemove).data?.body;
  return body && body.schema === 'farcaster.xyz/schemas/v1/cast-remove' && typeof body.targetHash === 'string';
}

export function isCastRecast(msg: FC.Message): msg is FC.CastRecast {
  const body = (msg as FC.CastRecast).data?.body;
  return body && body.schema === 'farcaster.xyz/schemas/v1/cast-recast' && typeof body.targetCastUri === 'string';
}

export function isReaction(msg: FC.Message): msg is FC.Reaction {
  const body = (msg as FC.Reaction).data?.body;
  return (
    body &&
    body.schema === 'farcaster.xyz/schemas/v1/reaction' &&
    typeof body.active === 'boolean' &&
    typeof body.targetUri === 'string' &&
    body.type === 'like'
  );
}

export function isVerification(msg: FC.Message): msg is FC.Verification {
  return isVerificationAdd(msg) || isVerificationRemove(msg);
}

export function isVerificationAdd(msg: FC.Message): msg is FC.VerificationAdd {
  const body = (msg as FC.VerificationAdd).data?.body;
  return (
    body &&
    body.schema === 'farcaster.xyz/schemas/v1/verification-add' &&
    body.externalSignatureType === 'eip-191-0x45' &&
    typeof body.externalSignature === 'string' &&
    typeof body.externalUri === 'string' &&
    typeof body.claimHash === 'string' &&
    body.claimHash.length > 0
  );
}

export function isVerificationRemove(msg: FC.Message): msg is FC.VerificationRemove {
  const body = (msg as FC.VerificationRemove).data?.body;
  return (
    body &&
    body.schema === 'farcaster.xyz/schemas/v1/verification-remove' &&
    typeof body.claimHash === 'string' &&
    body.claimHash.length > 0
  );
}
