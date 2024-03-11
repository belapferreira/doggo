import { GithubLogo } from '@phosphor-icons/react';

import doggo from '@/assets/doggo.png';

export const Header = () => {
  return (
    <div className="flex w-full">
      <div className="mx-auto flex w-full max-w-[1352px] items-center justify-between gap-10 px-6 py-4">
        <img src={doggo} className="h-14" />

        <a
          href="https://github.com/belapferreira/doggo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo weight="fill" size={28} color="#525252" />
        </a>
      </div>
    </div>
  );
};
