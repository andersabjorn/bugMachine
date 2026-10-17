#!/usr/bin/env bash
# Compile the hard-bug sources twice.
# Without a project-wide Xunit import the build fails with CS0246.
# With <Using Include="Xunit" /> the same files compile.
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
csproj="$root/src/BugMachine.Tests/BugMachine.Tests.csproj"
sources=(
  "$root/src/BugMachine.Current/ClosureBug.cs"
  "$root/src/BugMachine.Current/LruCache.cs"
  "$root/src/BugMachine.Tests/ClosureBugTests.cs"
  "$root/src/BugMachine.Tests/LruCacheTests.cs"
)

for src in "${sources[@]}"; do
  if [[ ! -f "$src" ]]; then
    echo "missing source: $src" >&2
    exit 1
  fi
done

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

write_project() {
  local dir="$1"
  local with_using="$2"
  mkdir -p "$dir"
  local using_xml=""
  if [[ "$with_using" == "yes" ]]; then
    using_xml='  <ItemGroup>
    <Using Include="Xunit" />
  </ItemGroup>'
  fi
  cat > "$dir/prove.csproj" << EOF
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <IsPackable>false</IsPackable>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="xunit" Version="2.6.1" />
  </ItemGroup>
${using_xml}
</Project>
EOF
  local src
  for src in "${sources[@]}"; do
    ln -s "$src" "$dir/$(basename "$src")"
  done
}

write_project "$work/without" no
set +e
dotnet build "$work/without/prove.csproj" --nologo > "$work/without.log" 2>&1
without_status=$?
set -e
cat "$work/without.log"

if [[ $without_status -eq 0 ]]; then
  echo "expected the build without the Xunit import to fail" >&2
  exit 1
fi
if ! grep -q "CS0246" "$work/without.log"; then
  echo "expected CS0246 without the Xunit import" >&2
  exit 1
fi

if ! grep -q '<Using Include="Xunit" />' "$csproj"; then
  echo "src/BugMachine.Tests/BugMachine.Tests.csproj does not import Xunit" >&2
  exit "$without_status"
fi

write_project "$work/with" yes
dotnet build "$work/with/prove.csproj" --nologo | tee "$work/with.log"
if ! grep -q "Build succeeded." "$work/with.log"; then
  echo "expected the build with the Xunit import to succeed" >&2
  exit 1
fi
if ! grep -q "0 Warning(s)" "$work/with.log" || ! grep -q "0 Error(s)" "$work/with.log"; then
  echo "expected 0 warnings and 0 errors with the Xunit import" >&2
  exit 1
fi
