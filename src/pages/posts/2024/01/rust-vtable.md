---
layout: "@layouts/PostLayout.astro"
title: Rust虚表布局规则介绍
date: 2024-01-25
category: Rust
tags: ["compiler", "rust"]
---

在 Rust 中，一个指向未知大小对象（`!Sized`）的引用或指针被实现为一个由两个 `usize` 大小的域构成的胖指针。这两个域中，其中一个域保存了被引用或被指向的对象的地址，另一个域保存了一个名为 metadata 的数据。对于 slice 的引用或指针来说，其 metadata 为 slice 的长度。对于 trait object 的引用或指针来说，其 metadata 为虚表（vtable）地址。与 C++ 虚表类似，Rust 虚表的存在使得诸多动态语言特性得以实现，例如动态派发（dynamic dispatch）、向上转换（upcasting）、向下转换（downcast）等。本文将对 Rust 中虚表的布局规则进行简要介绍，并在此过程中对 Rust 中若干动态特性的实现方法进行简要介绍。

> 注意：Rust 虚表及其结构属于 Rust 语言的内部实现细节，不保证稳定性。本文所介绍的虚表布局仅反映本文创作时最新的 Rust 虚表结构，在将来 Rust 虚表结构可能会发生变化。一个 Rust 程序的正确性不应该以任何方式依赖于 Rust 虚表的结构。

## 基本结构

Rust 程序中的所有虚表均以一个固定结构的 header 开头。Header 中按顺序包含三个 `usize` 大小的字段：`drop_in_place` ，`size` 和 `align` 。在 header 之后是一系列的 `usize` 大小字段，其数量以及含义在每个虚表中可能都不同。
