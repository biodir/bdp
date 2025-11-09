#!/bin/bash

set -e

REPO="${GITHUB_REPOSITORY:-owner/repo}"
VERSION="${1:-latest}"

if [ "$VERSION" == "latest" ]; then
  echo "📦 Fetching latest release..."
  RELEASE_URL="https://api.github.com/repos/$REPO/releases/latest"
else
  echo "📦 Fetching release $VERSION..."
  RELEASE_URL="https://api.github.com/repos/$REPO/releases/tags/v$VERSION"
fi

RELEASE_DATA=$(curl -sL "$RELEASE_URL")
TAG_NAME=$(echo "$RELEASE_DATA" | grep -o '"tag_name": "[^"]*' | cut -d'"' -f4)

if [ -z "$TAG_NAME" ]; then
  echo "❌ Error: Release not found"
  exit 1
fi

VERSION_NUMBER="${TAG_NAME#v}"

echo "📦 Installing BDP CLI $VERSION_NUMBER"

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$OS-$ARCH" in
  linux-x86_64)
    RUNTIME="linux-x64"
    ;;
  linux-aarch64)
    RUNTIME="linux-arm64"
    ;;
  darwin-x86_64)
    RUNTIME="osx-x64"
    ;;
  darwin-arm64)
    RUNTIME="osx-arm64"
    ;;
  *)
    echo "❌ Error: Unsupported platform $OS-$ARCH"
    exit 1
    ;;
esac

DOWNLOAD_URL="https://github.com/$REPO/releases/download/$TAG_NAME/bdp-cli-${VERSION_NUMBER}-${RUNTIME}.tar.gz"

echo "⬇️  Downloading from $DOWNLOAD_URL"

TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

if ! curl -sL "$DOWNLOAD_URL" | tar xz; then
  echo "❌ Error: Failed to download or extract"
  rm -rf "$TEMP_DIR"
  exit 1
fi

if [ ! -f "bdp" ] && [ ! -f "BDP.CLI" ]; then
  echo "❌ Error: CLI binary not found in archive"
  rm -rf "$TEMP_DIR"
  exit 1
fi

[ -f "BDP.CLI" ] && mv BDP.CLI bdp

chmod +x bdp

INSTALL_DIR="${INSTALL_DIR:-/usr/local/bin}"

echo "📂 Installing to $INSTALL_DIR"

if [ -w "$INSTALL_DIR" ]; then
  mv bdp "$INSTALL_DIR/"
else
  sudo mv bdp "$INSTALL_DIR/"
fi

cd - > /dev/null
rm -rf "$TEMP_DIR"

echo "✅ BDP CLI installed successfully!"
echo ""
echo "Run 'bdp --version' to verify installation"
echo "Run 'bdp --help' to see available commands"
