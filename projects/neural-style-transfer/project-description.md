---
title: Neural Style Transfer
date: 2025-11
description: A PyTorch implementation of artistic style transfer using VGG-19 feature maps. Generates stylized images by optimizing content and style loss across convolutional layers.
tags: [python, pytorch, computer-vision]
---

## Overview

Implements Gatys et al.'s neural style transfer algorithm, applying the texture and aesthetic of one image onto the structure of another via gradient descent on the pixel space.

## Architecture

- **Backbone**: VGG-19 pretrained on ImageNet, layers up to `relu4_2` for content, `relu1_1`–`relu5_1` for style
- **Loss**: Content loss (MSE on feature activations) + style loss (Gram matrix distance) + optional total variation loss
- **Optimizer**: L-BFGS for fast convergence on image optimization

## Results

Converges in ~300 iterations on a single GPU. Output resolution scales with VRAM — 512×512 on 8GB, 1024×1024 on 16GB.
