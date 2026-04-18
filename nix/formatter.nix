{ inputs, ... }:
{
  imports = [ inputs.treefmt-nix.flakeModule ];

  perSystem.treefmt = {
    projectRootFile = "flake.nix";

    programs = {
      deadnix.enable = true;
      nixfmt.enable = true;
      statix.enable = true;
      nixf-diagnose.enable = true;

      oxfmt.enable = true;

      shellcheck.enable = true;
      shfmt.enable = true;
    };
  };
}
